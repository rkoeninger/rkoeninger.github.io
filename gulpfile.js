const { src, task } = require("gulp");
const deploy = require("gulp-gh-pages")({
  branch: "master"
});

console.log(src);
console.log("hi");

// task('deploy', () => src('./dist/**/*').pipe(deploy));
