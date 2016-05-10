<?php require_once('functions.php'); ?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Harvest Money</title>
    <link rel="stylesheet" href="assets/styles/output/main.css">
  </head>
  <body>

    <div class="wrapper">

        <h1>Harvest Money</h1>

        <?php foreach ($projects as $project) { ?>

            <section class="project">
                <header>
                    <h2><?php echo $project->name; ?></h2>
                </header>

                <div class="table">
                    <div class="row">
                        <div class="task">Task</div>
                        <div class="hours">?,?? uur</div>
                        <div class="price">€ ???,??</div>
                    </div>

                    <div class="row">
                        <div class="task">Task</div>
                        <div class="hours">?,?? uur</div>
                        <div class="price">€ ???,??</div>
                    </div>

                    <div class="row">
                        <div class="task">Task</div>
                        <div class="hours">?,?? uur</div>
                        <div class="price">€ ???,??</div>
                    </div>

                    <div class="row total">
                        <div class="task">&nbsp;</div>
                        <div class="hours">
                            <?php echo number_format($project->hours, 2, ',', '.'); ?> uur
                        </div>
                        <div class="price">
                            € <?php echo number_format($project->price, 2, ',', '.'); ?>
                        </div>
                    </div>
                </div>

                <footer>
                    <a class="button" href="#">Factureer uren</a>
                </footer>
            </section>

        <?php } ?>

    </div>

  </body>
</html>
