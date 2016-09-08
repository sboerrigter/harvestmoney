<?php
    namespace Sboerrigter\HarvestMoney;

    include_once('lib/autoload.php');

    $id = $_POST['projectid'];

    /**
     * Get Project entries
     */
    $endpoint = 'projects/' . $id . '/entries';
    $filters = array(
        'from' => '2016-05-01',
        'to' => '2016-05-31',
    );
    $entries = Harvest::get($endpoint, $filters);

    foreach ($entries as $entry) {
?>

    <pre><?php print_r($entry); ?></pre>

<?php } ?>
