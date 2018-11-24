var gulp = require('gulp'),
		sass = require ('gulp-sass'),
		notify = require('gulp-notify'),
		filter = require('gulp-filter'),
		minify = require('gulp-minify-css');
		autoprefixer = require('gulp-autoprefixer'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin');
		
		
var config = {
	stylesPath: 'assets/styles',
	jsPath: 'assets/scripts',
	outputDir: 'public/dist'
}



gulp.task('icons', function() { 
	return gulp.src('./node_modules/font-awesome/fonts/**.*') 
		.pipe(gulp.dest(config.outputDir + '/fonts')); 
});

gulp.task('images', function() { 
	return gulp.src(config.imagesPath + '/*')
		.pipe(imagemin())
		.pipe(gulp.dest(config.outputDir + '/images'))
});

gulp.task('css', function() {
	return gulp.src([ './node_modules/bootstrap/dist/css/bootstrap.min.css' ,'./node_modules/font-awesome/scss' ,'assets/styles/addons/*.sass' ,'assets/styles/custom.sass' ])	
		.pipe(concat('main.css'))
		 .pipe(minify())	
		.pipe(autoprefixer())		
		.pipe(gulp.dest(config.outputDir + '/css'));
});


gulp.task('jquery', function(){
	return gulp.src('./node_modules/jquery/dist/jquery.min.js') 
		.pipe(gulp.dest(config.outputDir + '/js')); 
});

gulp.task('bootstrap-js', function(){
	return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js') 
		.pipe(gulp.dest(config.outputDir + '/js')); 
});

gulp.task('js', function() {
	return gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/bootstrap/dist/js/bootstrap.min.js', 'assets/scripts/*.js'])
		.pipe(filter('**/*.js'))
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest(config.outputDir + '/js'));
});

gulp.task('watch', function(){
	gulp.watch([config.stylesPath + '**/*.scss', config.stylesPath + '**/*.sass', config.stylesPath + '**/*.css'], ['css']);
	gulp.watch([config.jsPath + '**/*.js'], ['js']);
	gulp.watch([config.imagesPath + '/**/*'], ['images']);
});

gulp.task('default', ['icons', 'css', 'js']);