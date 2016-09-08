$(function() {
      $('#summernote').summernote({
		  toolbar: [
    //[groupname, [button list]]
     
    ['style', ['bold', 'italic', 'underline', 'clear']],
    ['font', ['strikethrough', 'superscript', 'subscript']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']],
  ],
        tabsize: 2,
          height: 200
      });

      $('form').on('submit', function (e) {
        e.preventDefault();
        alert($('.summernote').code());
      });
    });
	
	var edit = function() {
  $('.click2edit').summernote({toolbar: [
    //[groupname, [button list]]
     
    ['style', ['bold', 'italic', 'underline', 'clear']],
    ['font', ['strikethrough', 'superscript', 'subscript']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']],
  ],focus: true});
};
var save = function() {
  var aHTML = $('.click2edit').code(); //save HTML If you need(aHTML: array).
  $('.click2edit').destroy();
};