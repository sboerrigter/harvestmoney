<?php
/**
 * Include files
 */
require_once(__DIR__ . '/vendor/autoload.php');
require_once('config.php');

/**
 * Connect to harvest
 *
 * Harvest login credentials (e.g. variables $harvest_user, $harvest_password
 * and $harvest_account) should be defined in config.php.
 */
$api = new Harvest\HarvestAPI();
$api->setUser($harvest_user);
$api->setPassword($harvest_password);
$api->setAccount($harvest_account);

/**
 * Get Projects
 */
$result = $api->getProjects();

if ($result->isSuccess()) {
    $harvest_projects = $result->data;
}

/**
 * Limit number of projects for better performance
 */
$harvest_projects = array_slice(array_reverse($harvest_projects), 0, 5);

/**
 * Get required project data
 */
$projects = array();

foreach ($harvest_projects as $project) {
    $id = $project->id;
    $name = $project->name;

    /**
     * Get project entries
     */
    $range = new Harvest\Model\Range('20160101', '20200101');
    $result = $api->getProjectEntries($id, $range);
    $entries = $result->data;

    /**
     * Calculate uninvoiced hours
     */
    $hours = 0;

    foreach ($entries as $entry) {
        if ($entry->{'is-billed'} == 'false') {
            $hours += $entry->hours;
        }
    }

    /**
     * Calculate price
     */
    $price = ($hours * 85);

    /**
     * Save data to $projects array if there are billable hours
     */
    if ($hours > 0) {
        $projects[] = (object) array(
            'id'    => $id,
            'name'  => $name,
            'hours' => $hours,
            'price' => $price
        );
    }
}

/**
 * Debug
 */
// echo '<pre>';
// print_r($projects);
// echo '</pre>';
