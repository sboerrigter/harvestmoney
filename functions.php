<?php

namespace Sboerrigter\HarvestMoney;

/**
 * Include files
 */
require_once(__DIR__ . '/vendor/autoload.php');
require_once('config.php');

/**
 * Connect to harvest
 *
 * Harvest login credentials (e.g. variables $harvestuser, $harvestpassword and
 * $harvestaccount) should be defined in config.php.
 */
$api = new Harvest\HarvestReports();
$api->setUser($harvestuser);
$api->setPassword($harvestpass);
$api->setAccount($harvestaccount);

/**
 * Get active projects
 */
$result = $api->getActiveProjects();

if ($result->isSuccess()) {
    $projects = $result->data;
}
