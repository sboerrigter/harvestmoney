<?php
    namespace Sboerrigter\HarvestMoney;

    include_once('lib/autoload.php');

    /**
     * Get Harvest projects
     */
    $endpoint = 'projects';
    $filters = array(
        'updated_since' => '2016-01-01',
    );

    $projects = Harvest::get($endpoint, $filters);

    foreach ($projects as $project) {
        $project = $project->project;
        $id = $project->id;
        $name = $project->name;
        $slug = strtolower(str_replace(' ', '-', $project->name));
        $active = $project->active;
        $billable = $project->billable;

        /**
         * Exclude archived and non billable projects
         */
        if ($active != 1 || $billable != 1) {
            continue;
        }
?>

    <section class="project" id="<?php echo $slug; ?>">
        <h2><?php echo $name; ?></h2>

        <a class="button load-tasks" data-id="<?php echo $id; ?>" href="#<?php echo $slug; ?>">Show me the money</a>

        <div class="tasks" id="<?php echo $id; ?>"></div>
    </section>

<?php
    }
?>
