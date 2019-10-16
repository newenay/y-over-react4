// For SCORM 2004 only
var gAPI = null;

var gnScormSessionState = 0; // 0=not initialized; 1=initialized; 2=terminated
var _gbDebug = true; // default should be false

var MAX_PARENTS_TO_SEARCH = 500; 
/* ScanParentsForApi
  -Searches all the parents of a given window until it finds an object named "API_1484_11". If an
  object of that name is found, a reference to it is returned. Otherwise, this function returns null. */

function ScanParentsForApi(win) {    
  /* Establish an outrageously high maximum number of parent windows that we are will to search as a
  safe guard against an infinite loop. This is probably not strictly necessary, but different 
  browsers can do funny things with undefined objects. */    
  
  var nParentsSearched = 0;    
  /* Search each parent window until we either:
    -find the API, 
    -encounter a window with no parent (parent is null 
              or the same as the current window)
    -or, have reached our maximum nesting threshold */   
  while ( (win.API_1484_11 == null) && 
    (win.parent != null) && (win.parent != win) && 
    (nParentsSearched <= MAX_PARENTS_TO_SEARCH) ) {

    nParentsSearched++; 
    win = win.parent;
  }

  /* If the API doesn't exist in the window we stopped looping on, 
  then this will return null. */
  return win.API_1484_11; 
} 
 
/*GetAPI
-Searches all parent and opener windows relative to the current window for the SCORM 2004 API Adapter. Returns a reference to the API Adapter if found or null otherwise*/
function GetApi() {   
  var API = null; 
  
  //Search all the parents of the current window if there are any
  if ((window.parent != null) && (window.parent != window)) { 
    API = ScanParentsForApi(window.parent); 
  }

  /* If we didn't find the API in this window's chain of parents, 
  then search all the parents of the opener window if there is one */
  if ((API == null) && (window.top.opener != null)) { 
    API = ScanParentsForApi(window.top.opener); 
  } 
  return API;
}

function ScormInitialize() {
  if (gnScormSessionState == 0) {
    gAPI = GetApi();
	
    if ((gAPI != null) && (gAPI.Initialize("") == "true")) {
      gnScormSessionState = 1;
      if(_gbDebug) {console.log("API: SCORM Initialized")}
    }else{
	    console.log("API: Error finding API instance");
	  }
  }

  //if inialized, do SCO preparation.
  if (gnScormSessionState == 1) {
    if (typeof(SCOSessionInitializedHandler)=="function") SCOSessionInitializedHandler();
	  //sets initial incomplete status
    var strCS = ScormGetValue("cmi.completion_status");
    if ((strCS == "unknown") || (strCS == "not attempted")) {
      ScormSetValue("cmi.completion_status", "incomplete");
	  }
	  return true; // used by Main.js
  }
  /* return gnScormSessionState; */
}

function ScormTerminate() {
  if (gnScormSessionState == 1) {
    var strCS = ScormGetValue("cmi.completion_status");
    
    if (strCS == "incomplete") {
      //this should signal "cmi.entry" to be set to "resume" by LMS
      ScormSetValue("cmi.exit", "suspend"); 
      //ScormSetValue("adl.nav.request", "suspendAll"); //suspect messes up JKO??

    }else if (strCS == "completed") {
      /** AtlasPro does'nt use, and causes first SCO to complete the course(1.0 vs .166) **
       ScormSetValue("cmi.score.scaled","1.0");
    
      //Sets the Primary Objective to "true" whether it be implicit (default defined by LMS) or explicit (defined by user to use in rollup rules, say for a Pre-test).
      ScormSetValue("cmi.success_status", "passed");
      
      ScormSetValue("adl.nav.request", "continue"); //AtlasPro really does'nt like this!
      */
    }
    
	  //gAPI.Commit(""); //AtlasPro may not like?
	
    if (gAPI.Terminate("") == "true") {
      gnScormSessionState = 2;
      return "true";
    
    }else{ //this triggers if a false or "" is returned by LMS 
      JKOreconnect();
    }
  }
  return "false";
}

function JKOreconnect()
{
	console.log("API: AtlasPro LMS communication has been lost, attempting to reconnect...");	
	
	if(gnScormSessionState == 1) { //should only execute if never terminated.
	
		gnScormSessionState = 0
		ScormInitialize(); //may be inializing the following SCO in tests
		ScormSetValue("cmi.completion_status", "completed"); //how to know whether it's a exam or not?  This may trigger from idle disconnection...oh well!
		ScormTerminate();
  
  }else if (gnScormSessionState == 0) { //should execute if ScormInitialize() cannot find another API.
		console.log("API: AtlasPro LMS communication cannot be re-established, you must log out and log back in.  If you contact the JKO help desk, please reference [Incident 091230-000151].");	
	}
}

function ScormGetLastError() {
  var sErr = "-1";
  if (gAPI) sErr = gAPI.GetLastError();
  return sErr;
}

function ScormGetErrorString(sErr) {
  var strErr = "API: SCORM API not available or requested value is blank";
  
  if (gAPI) {
    // Note: Get Error functions may work even if the session is not open
    // (to help diagnose session management errors), but we're still careful,
    // and so we check whether each function is available before calling it.
    if ((isNaN(parseInt(sErr))) && (gAPI.GetLastError)) sErr = gAPI.GetLastError();
    if (gAPI.GetErrorText) strErr = gAPI.GetErrorText(sErr.toString());
  }
  return strErr;
}

function ScormGetValue(what) {
  var strR = "";
  if (gnScormSessionState == 1) {
    strR = gAPI.GetValue(what);
    if ((strR == "") && (ScormGetLastError() != 0) && (_gbDebug)) console.log(ScormGetErrorString());
  }
  if(_gbDebug) {console.log("API:", what, strR, typeof strR)}
  return strR;
}

function ScormSetValue(what, value) { 
  var strR = [];
  if (gnScormSessionState == 1) {
    gAPI.SetValue(what, value);
    strR = [what, value];
  }else{
    strR = [what, "false"];
  }
  if(_gbDebug) {console.log("API:", strR)}
  return strR;
}