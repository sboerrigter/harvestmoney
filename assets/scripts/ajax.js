jQuery(document).ready(function($) {
  /**
   * Smooth scroll to anchor links
   */
  $(document).on('click', 'a', function(event){
      $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
      }, 500);
  });

  /**
   * Load projects
   */
  $.get('projects.php', function(data) {
    $('.projects').html(data);

    clickableButtons();
  });

  /**
   * Load tasks
   */
  function clickableButtons() {
    $('.projects').find('.load-tasks').click(function() {

      var projectid = $(this).data('id');

      /* Show loader */
      $.get('loading.php', function(data) {
        $('#' + projectid).html(data);

        /* Show results */
        $.ajax({
            type: "POST",
            url: "tasks.php",
            data: { projectid: projectid },
            success: function(data){
                $('#' + projectid).html(data);
            }
        })

      });
    });
  }


});
