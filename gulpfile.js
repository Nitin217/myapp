var gulp = require('gulp');
var bower = require('bower');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var gulpif = require('gulp-if');
var debug = require('gulp-debug');
var path = require('path');
var runSequence = require('run-sequence');
var del = require('del');
var merge = require('merge-stream');
var connect = require('gulp-connect');
const concat = require('gulp-concat');
const jshint = require('gulp-jshint');
var htmlhint = require("gulp-htmlhint");
var templateCache = require('gulp-angular-templatecache');
var sass = require('gulp-sass');
var ngAnnotate = require('gulp-ng-annotate');
var bytediff = require('gulp-bytediff');
var order = require("gulp-order");
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var filter = require('gulp-filter');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var inject = require('gulp-inject');

var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var connect = require('gulp-connect');

const gutil = require('gulp-util');
const log = gutil.log;
const colors = gutil.colors;

const config = require('./gulp-config.json');
const bases = config.bases;
const paths = config.paths;

var developement = false;

var targetFolder = bases.src+bases.applicationPath;

//gulp.task('default', ['sass']);


gulp.task('default', function(callback) {
  	runSequence('clean-all',
			['generateVendorJS', 'generateVendorCSS','appJSHint', 'appHtmlHint'],
          	['appSass'],
          	'angularTemplateCache',
          	['concatApplicationJS', 'concatApplicationCSS'], 'rev-and-inject',
           	[ 'copy-bower-files', 'copy-i18-files', 'copy-images'], 'deploy-to-target',
          	callback);
});


gulp.task('clean-all', function() {
	log(colors.blue('Clean build and target folder'));	
  	return del([bases.appBuild], {force:true});
});

//Generate Vendor JS
gulp.task('generateVendorJS', function(){
	log(colors.blue('Generate Vendor JS'));

	var vendorJSFileName = 'vendor.min.js';
	var scriptSrc = paths.libMinScript;
	if(developement){
		scriptSrc = paths.libScript;
	}

	return gulp.src(scriptSrc, {cwd: bases.src})	 // set source		
		.pipe(concat(vendorJSFileName))   // write to vendor.min.css		
		.pipe(gulp.dest(bases.distTemp+bases.jsPath+bases.sep)); // write to dest

});


//Generate Vendor CSS
gulp.task('generateVendorCSS', function(){
	log(colors.blue('Generate Vendor CSS'));

	var vendorCSSFileName = 'vendor.min.css';
	var styleSrc = paths.libMinStyles;
	if(developement){
		styleSrc = paths.libStyles;
	}

	return gulp.src(styleSrc, {cwd: bases.src}) // set source	
		.pipe(concat(vendorCSSFileName)) // write to vendor.min.css		
		.pipe(gulp.dest(bases.distTemp+bases.cssPath+bases.sep)); // write to dest
});


//App JS Hint
gulp.task('appJSHint', function(){
	log(colors.blue('Validating JS'));
	return gulp.src([paths.appScripts], {cwd: bases.src}) // set source		
		.pipe(jshint())  //JS Hint
		.pipe(jshint.reporter('gulp-jshint-html-reporter', {
	      filename: bases.reportFolder + 'jshint-output.html',
	      createMissingFolders : true  
	    })); 
});


 //App html hint
gulp.task('appHtmlHint', function(){
	log(colors.blue('Validating HTML'));
	return gulp.src("**/*.html", {cwd: bases.src}) 
	 	.pipe(htmlhint(".htmlhintrc"))
	 	.pipe(htmlhint.reporter("htmlhint-stylish"))
	 	.pipe(htmlhint.failReporter({
            supress: true
        }));
});


//sass to css convertor
gulp.task('appSass', function () {
	log(colors.blue('Start SASS to CSS convertor'));
  	return gulp.src(paths.scss)
    	.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest(bases.tempFolder));
});




//Create Angular Templatecache file
gulp.task('angularTemplateCache', function(){	
		log(colors.blue('Copying HTML Files in partial folder'));
		return gulp.src(paths.partialHtml, {cwd: bases.src})   // set source
				.pipe(templateCache({
		            module: bases.angularModule,
		            root: 'partial/'
		        }))	 	
	    		.pipe(gulp.dest(bases.tempFolder));	    		
});



//Concat Application JS
gulp.task('concatApplicationJS', function(){
	log(colors.blue('Concat application JS'));
	
	var destFileName = 'app.min.js';

	return gulp.src([].concat( path.join(bases.jsFolder, '**/*.js'), 
			     path.join(bases.tempFolder, '**/*.js'))) // set source	
		.pipe(order(paths.appScriptOrder))
		.pipe(sourcemaps.init())	
		.pipe(concat(destFileName))  // write to vendor.min.cssFilter
		.pipe(ngAnnotate())				
		.pipe(bytediff.start())		// start tracking size
		.pipe(uglify())  //uglify JS	
		.pipe(bytediff.stop(bytediffFormatter))		// stop tracking size	
		.pipe(sourcemaps.write('../'+bases.jsPath))
		.pipe(gulp.dest(bases.distTemp+bases.jsPath+bases.sep)); // write to dest
});



//Concat Application CSS
gulp.task('concatApplicationCSS', function(){
	log(colors.blue('Concat application CSS'));

	var destFileName = 'app.min.css';

	return gulp.src([].concat(path.join(bases.tempFolder, paths.appStyles)))   // set source
		// .pipe(debug({title: 'CSS Files:'}))		
		.pipe(concat(destFileName))  // write to vendor.min.css
		.pipe(bytediff.start())		// start tracking size		
		.pipe(cleanCSS())  //Minify CSS	
		.pipe(bytediff.stop(bytediffFormatter))		// stop tracking size		
		.pipe(gulp.dest(bases.distTemp+bases.cssPath+bases.sep));  // write to dest
});


// Revision and inject into index.html, then write it to the dist folder
gulp.task('rev-and-inject', function(){
	log(colors.blue('Revision and inject js and css in html'));

	var indexFilter = filter(paths.html, {restore: true});
	var cssFilter = filter("**/*.css", {restore: true});
	var jsFilter = filter("**/*.js*", {restore: true});

	var srcPath = [].concat(path.join(bases.distTemp, '**/*.css'), path.join(bases.distTemp, '**/*.js*'));
	for(var arrIndex in paths.html){
		srcPath = srcPath.concat(path.join(bases.src, paths.html[arrIndex]));
	}

	return gulp.src(srcPath)

		// filter to *.min.css, add the revision to the files, write the files, clear the filter
		.pipe(cssFilter)
		.pipe(rev())
		.pipe(gulp.dest(bases.dist))
		.pipe(cssFilter.restore)

		// add the revision to the js files
		.pipe(jsFilter)
		.pipe(rev())
		.pipe(gulp.dest(bases.dist))
		.pipe(jsFilter.restore)

		// filter to index.html and inject depenency, write index.html, clear the filter, substitute in new filenames
		.pipe(indexFilter)
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(localInject(path.join(bases.distTemp, '**/vendor.min.css'), 'inject-vendor'))
		.pipe(localInject(path.join(bases.distTemp, '**/app.min.css')))
		.pipe(localInject(path.join(bases.distTemp, '**/vendor.min.js'), 'inject-vendor'))
		.pipe(localInject(path.join(bases.distTemp, '**/app.min.js')))
		.pipe(gulp.dest(bases.dist))
		.pipe(indexFilter.restore)
		.pipe(revReplace())
		.pipe(gulp.dest(bases.dist));
});


 //Delete Temp Folder
gulp.task('delete-temp-folder', function(){
	log(colors.blue('Delete temp folder'));
	return del.sync([bases.distTemp, bases.tempFolder]);
});

//Copy Bower Files
gulp.task('copy-bower-files', function(){
	log(colors.blue('Copy Bower Files'));
	return gulp.src(paths.bowerFolderCopyFiles, {cwd: bases.bower_components})
		.pipe(gulp.dest(bases.dist));
});

//Copy i18 Files
gulp.task('copy-i18-files', function(){
	log(colors.blue('Copy i18 Files'));
	var boweri18CopyFiles = gulp.src(paths.boweri18CopyFiles, {cwd: bases.bower_components})
		.pipe(gulp.dest(bases.dist+'bower_components/angular-i18n'));
		
	var i18ResourcesJson = gulp.src(paths.i18ResourcesJson, {cwd: bases.src})
		.pipe(gulp.dest(bases.dist+'resources'));		

	return merge(boweri18CopyFiles, i18ResourcesJson);
});

// Minify images
gulp.task('copy-images', function(){
	log(colors.blue('Generate sprite images'));

	return gulp.src(paths.copyImages, {cwd: bases.src})
  		.pipe(gulp.dest(bases.dist+'images'));
}); 



gulp.task('deploy-to-target', function(callback){
	log(colors.blue('Depoly files to target folder'));

	runSequence('delete-deploy-folder',
		        'deploy-js','deploy-index-html' ,
		        callback);
});
gulp.task('delete-deploy-folder', function(){
	log(colors.blue('Delete Deploy Folder'));

	log(colors.blue('Clean build and target folder'));
	var delFolderList = [];
	if(targetFolder){
		delFolderList.push(targetFolder);
		return del(delFolderList, {force:true})
	}
  	return;
});

gulp.task('deploy-js', function(){
	log(colors.blue('Depoly  JS files to target folder'));
	if(targetFolder){
		return gulp.src(["**/*.*",'!**/index.html'], {cwd: bases.dist})
  		.pipe(gulp.dest(targetFolder));
	}else{
		log(colors.red('No Target Folder param found'));
	}
	return;
});
gulp.task('deploy-cs', function(){
	log(colors.blue('Depoly  CS files to target folder'));
	if(targetFolder){
		return gulp.src("**/cs/*.*", {cwd: bases.dist})
  		.pipe(gulp.dest(targetFolder));
	}else{
		log(colors.red('No Target Folder param found'));
	}
	return;
});

gulp.task('deploy-index-html', function(){
	log(colors.blue('Depoly index.html to target folder'));
	if(targetFolder){
		return gulp.src(["basehtml/index.html"], {cwd: bases.dist})
  		.pipe(gulp.dest(bases.src));
	}else{
		log(colors.red('No Target Folder param found'));
	}
	return;
});


  
gulp.task('sass', function(done) {
 gulp.src('./scss/ionic.app.scss')
   .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
     keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});


/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
	var formatPercent = function(num, precision) {
		return (num * 100).toFixed(precision);
	};
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';

    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' + (data.endSize / 1000).toFixed(2) + ' kB' +
        ' and is ' + formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 * Local Inject
 **/
function localInject(pathGlob, name) {
	var options = {
		ignorePath: bases.distTemp,		
		addPrefix: bases.applicationPath
	};
	if (name) {
		options.name = name;
	}
	return inject(gulp.src(pathGlob, {read: false}), options);
}

