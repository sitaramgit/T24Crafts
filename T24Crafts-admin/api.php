<?php
/*+*******************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is: vtiger CRM Open Source
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 ********************************************************************************/
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once("config.php");
require_once "vendor/autoload.php";

// Required headers to allow CORS
header("Access-Control-Allow-Origin: http://localhost:3000");
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
include_once 'vtlib/Vtiger/Functions.php';
include_once 'includes/main/WebUI.php';

require_once("libraries/HTTP_Session2/HTTP/Session2.php");
require_once 'include/Webservices/Utils.php';
require_once("include/Webservices/State.php");
require_once("include/Webservices/OperationManager.php");
require_once("include/Webservices/SessionManager.php");
require_once("include/Zend/Json.php");
require_once('include/logging.php');
require_once 'include/Webservices/Create.php';
require_once('modules/Contacts/Contacts.php');


$API_VERSION = "0.22";

global $seclog, $log, $adb;
$seclog = Logger::getLogger('SECURITY');
$log = Logger::getLogger('webservice');


// Get operation from request
$operation = strtolower(vtws_getParameter($_REQUEST, "operation"));
$sessionId = vtws_getParameter($_REQUEST, "sessionName");


$sessionManager = new SessionManager();

$operationManager = new OperationManager($adb, 'create', 'json', $sessionManager);
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

    $data = json_decode(file_get_contents("php://input"), true);
    echo $operationManager->encode(create_user($data));
    // die;
  
    // Define operations (GET, POST, PUT, DELETE)
    switch ($operation) {
        case 'getcontacts':
            $response = getContacts();
            break;
        case 'createUser':
            $response = json_decode(file_get_contents("php://input"), true);
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
function create_user($input_array)
{ 
    // return $input_array;
	 global $adb,$log; 
	$pemail =$input_array['email']; 
	$mailingcity = $input_array['mailingcity'];
	$mailingcountry = $input_array['mailingcountry'];
	
	$sql = "SELECT * FROM vtiger_contactdetails  left join vtiger_crmentity on vtiger_crmentity.crmid = vtiger_contactdetails.contactid where email = '$pemail' and deleted = 0";

	
 
	$result = $adb->pquery($sql, array());
	$noofrows = $adb->num_rows($result);
	$output = array();
	if($noofrows != 0){
		$output[0]['status'] = false;
		$output[0]['err'] = "contact";
		$output[0]['msg'] = "Entered EmailId is already in use, try with another EmailId";
		return $output;
	}
		
 


    $user = CRMEntity::getInstance('Users');
    $user->id = $user->getActiveAdminId();
    $user->retrieve_entity_info($user->id, 'Users');
 
// Retrieve user information
$current_date = date('Y-m-d');
$payload = [
    'email' => $input_array['email'], 
    'lastname' => $input_array['family_name'],
    'imagename' => $input_array['picture'] ?? '',
    'leadsource' => "Public Relations",
    'support_start_date' => $current_date,
    'support_end_date' => date('Y-m-d', strtotime("+12 months", strtotime($current_date))),
    'assigned_user_id' => $user->id, // Make sure user ID is valid
];

// Create new Contact entity
$contact = new Contacts();
$contact->column_fields = $payload;
$contact->column_fields['firstname'] = $input_array['given_name'];
$contact->column_fields['description'] = 'Additional contact details here';
// return $contact;

try {
    $contact->save('Contacts');
    return ['status' => true, 'contact' => $contact];
} catch (Exception $e) {
    return ['status' => false, 'error' => $e->getMessage()];
}
    // $focus->column_fields = $payload;
    
    // return $focus->column_fields;
	// $focus->column_fields['email'] = $input_array['email'];
	// $focus->column_fields['lastname'] = $input_array['family_name'];  
	// $focus->column_fields['imagename'] = $input_array['picture'];
    // return $focus->column_fields;
	// $focus->column_fields['mailingstate'] = $input_array['mailingstate']; 
	// $focus->column_fields['mailingcountry'] = $input_array['mailingcountry']; 
	// $focus->column_fields['mailingzip'] = $input_array['mailingzip']; 
	// $focus->column_fields['mailingstreet'] = $input_array['mailingstreet'];
	// $focus->column_fields['leadsource'] = "Public Relations"; 
	
	// $focus->column_fields['mobile'] = $input_array['mobile']; 
	// $focus->column_fields['portal'] = $input_array['portal']; 
	// $focus->column_fields['support_start_date'] = $current_date; 
	// $focus->column_fields['support_end_date'] = date('Y-m-d', strtotime("+12 months $current_date")); 
	// $focus->column_fields['assigned_user_id'] = $user->id; 

    // return $focus;
	//  $focus->save('Contacts');
    //  return $focus;
	// $output[0]['status'] = true;
	// $output[0]['msg'] = "success";
	// $output[0]['responce'] = $res;
	// return $output; 
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
