module.exports = {
    plugins: {
      // require('precss'),
      // require('autoprefixer'),
      'precss': {},
      'autoprefixer': {},
      // 'postcss-sprites' : {
      //     filterBy: function(image) {
      //       // console.log(image);
      //       console.log(/\/back.png$/.test(image.url))
      //       if (/\/back.png$|\/back_content.png$|_frame_center.png$|\/menu-active-back.png$/.test(image.url)) {
      //         return Promise.reject();
      //       }
      //       // console.log(Promise.resolve());
      
      //       return Promise.resolve();
      //     }
      // }
    }
}