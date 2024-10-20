<?php
/*+*******************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is: vtiger CRM Open Source
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 ********************************************************************************/

require_once("config.php");
require_once "vendor/autoload.php";

// Required headers to allow CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-type: application/json');

// Enable preflight request for CORS (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once 'include/Webservices/Relation.php';
include_once 'vtlib/Vtiger/Module.php';
include_once 'includes/main/WebUI.php';

require_once("libraries/HTTP_Session2/HTTP/Session2.php");
require_once 'include/Webservices/Utils.php';
require_once("include/Webservices/State.php");
require_once("include/Webservices/OperationManager.php");
require_once("include/Webservices/SessionManager.php");
require_once("include/Zend/Json.php");
require_once('include/logging.php');


$API_VERSION = "0.22";

global $seclog, $log, $adb;
$seclog = Logger::getLogger('SECURITY');
$log = Logger::getLogger('webservice');


// Get operation from request
$operation = strtolower(vtws_getParameter($_REQUEST, "operation"));
$sessionId = vtws_getParameter($_REQUEST, "sessionName");


$sessionManager = new SessionManager();

$operationManager = new OperationManager($adb, 'retrieve', 'json', $sessionManager);
if (!$operation) {
    writeErrorOutput($operationManager, new WebServiceException(WebServiceErrorCode::$INVALIDREQUEST, "Invalid operation"));
    return;
}

try {
    // // Handle session
    // if (!$sessionId || strcasecmp($sessionId, "null") === 0) {
    //     $sessionId = null;
    // }
    // $sid = $sessionManager->startSession($sessionId, false);
    // if (!$sessionId && !$operationManager->isPreLoginOperation()) {
    //     throw new WebServiceException(WebServiceErrorCode::$AUTHREQUIRED, "Authentication required");
    // }

    // if (!$sid) {
    //     throw new WebServiceException(WebServiceErrorCode::$AUTHREQUIRED, $sessionManager->getError());
    // }

    // $userid = $sessionManager->get("authenticatedUserId");
    

    // if ($userid) {
    //     $seed_user = new Users();
    //     $current_user = $seed_user->retrieveCurrentUserInfoFromFile($userid);
    // } else {
    //     $current_user = null;
    // }

    // Sanitize the operation input
    $operationInput = $operationManager->sanitizeOperation($operationManager->getOperationInput());
  
    // Define operations (GET, POST, PUT, DELETE)
    switch ($operation) {
        case 'getcontacts':
            $response = getContacts();
            break;

        case 'createcontact':
            $data = json_decode(file_get_contents("php://input"), true);
            $response = createContact($data);
            break;

        case 'updatecontact':
            $data = json_decode(file_get_contents("php://input"), true);
            $response = updateContact($data);
            break;

        case 'deletecontact':
            $contactId = vtws_getParameter($_REQUEST, 'contactid');
            $response = deleteContact($contactId);
            break;

        default:
            throw new WebServiceException(WebServiceErrorCode::$INVALIDOPERATION, "Unknown operation requested");
    }
// print_r($operationManager);
echo $operationManager->encode($response);
// echo $response;
} catch (WebServiceException $e) {
    writeErrorOutput($operationManager, $e);
} catch (Exception $e) {
    writeErrorOutput($operationManager, new WebServiceException(WebServiceErrorCode::$INTERNALERROR, "Unknown Error while processing request"));
}

/* Sample functions for API */
function getContacts() {
    // Implementation to retrieve contacts
    return ['success' => true, 'contacts' => []];
}

function createContact($data) {
    // Implementation to create a new contact
    return ['success' => true, 'contact_id' => 123];
}

function updateContact($data) {
    // Implementation to update contact data
    return ['success' => true];
}

function deleteContact($contactId) {
    // Implementation to delete a contact
    return ['success' => true];
}
?>
