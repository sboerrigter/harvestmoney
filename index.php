<?php
namespace Sboerrigter\HarvestMoney;

include_once('lib/autoload.php');
?>

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

        <?php
            /**
             * Get Harvest projects
             */
            $endpoint = 'projects';
            $filters = array(
                'updated_since' => '2016-01-01',
            );
            $projects = Harvest::get($endpoint, $filters);

            /**
             * Limit number of projects for performance
             */
            $projects = array_slice($projects, 0, 5);

            foreach ($projects as $project) {

                /**
                 * Exclude archived and non billable projects
                 */
                if ($project->project->active != 1 ||
                    $project->project->billable != 1) {
                    continue;
                }
        ?>

            <section class="project">
                <h2><?php echo $project->project->name; ?></h2>

                <?php
                    /**
                     * Get Project entries
                     */
                    $endpoint = 'projects/' . $project->project->id . '/entries';
                    $filters = array(
                        'from' => '2016-05-01',
                        'to' => '2016-05-31',
                    );
                    $entries = Harvest::get($endpoint, $filters);

                    foreach ($entries as $entry) {
                ?>

                    <pre><?php print_r($entry); ?></pre>

                <?php } ?>
            </section>

        <?php } ?>

    </div>

  </body>
</html>
