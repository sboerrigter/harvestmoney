<?php
/**
 * Harvest API
 */

namespace Sboerrigter\HarvestMoney;

final class Harvest
{
    /**
     * Load editor styles
     */
    public static function get($endpoint, $filters)
    {
        include_once('credentials.php');

        /**
         * Request parameters
         */
        $requesturl = 'https://' . HARVESTACCOUNT . '.harvestapp.com/' . $endpoint . '?' . http_build_query($filters);
        $authorization = base64_encode(HARVESTUSER . ':' . HARVESTPASSWORD);

        $headers = array(
            'Accept: application/json',
            'Content-Type: application/json',
            'Authorization: Basic ' . $authorization,
        );

        /**
         * Request data form Harvest
         */
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_URL, $requesturl);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        $response = json_decode(curl_exec($curl));

        /**
         * Return data
         */
        return $response;
    }
}
