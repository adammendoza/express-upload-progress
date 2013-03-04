$(function() {
  
  $('input[type="submit"]').on('click', function(evt) {
    evt.preventDefault();
    $('div.progress').show();
    var formData = new FormData();
    var file = document.getElementById('myFile').files[0];
    formData.append('myFile', file);
    
    var xhr = new XMLHttpRequest();
    
    xhr.open('post', '/', true);
    
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        var percentage = (e.loaded / e.total) * 100;
        $('div.progress div.bar').css('width', percentage + '%');
      }
    };
    
    xhr.onerror = function(e) {
      $('div.progress').hide();
      $('strong.message').text('An error occurred while submitting the form. Maybe your file is too big');
      $('div.alert').show();
    }
    
    xhr.onload = function() {
      $('div.progress').hide();
      $('strong.message').text(this.statusText);
      $('div.alert').show();
    }
    
    xhr.send(formData);
    
  })
  
});