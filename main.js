document.getElementById('issueInputForm').addEventListener('submit',saveIssue);

function saveIssue(e){
	var issueDesc = document.getElementById('issueDescInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	var issueId = chance.guid();
	var  issuestatus = 'open';

	var issue = {
		id: issueId,
		description: issueDesc,
		severity: issueSeverity,
		assignedTo: issueAssignedTo,
		status: issuestatus 
	}

	if(localStorage.getItem('issues') == null){
		var issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));		
	} 
	else{
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}

	document.getElementById('issueInputForm').reset();
	fetchissues();
	e.preventDefault();	
}


function setStatusClosed(id){
	var issues = JSON.parse(localStorage.getItem('issues'));
	for (var i=0 ; i<issues.length; i++){
		if(issues[i].id == id){
			issues[i].status = "closed";
		}
	}

	localStorage.setItem('issues',JSON.stringify(issues));
	fetchissues();
}

function deleteIssue(id){
	var issues = JSON.parse(localStorage.getItem('issues'));
	for (var i=0 ; i<issues.length; i++){
		if(issues[i].id == id){
			issues.splice(i,1);
		}
	}

	localStorage.setItem('issues',JSON.stringify(issues));
	fetchissues();
}


function fetchissues(){
	var issues = JSON.parse(localStorage.getItem('issues'));
	var issuesListe = document.getElementById('issueslist');
	issuesListe.innerHTML = '';
	for (var i = 0 ; i < issues.length ; i++){
		var id = issues[i].id;
		var desc = issues[i].description;
		var severity = issues[i].severity;
		var assignedTo = issues[i].assignedTo;
		var status = issues[i].status;

		issuesListe.innerHTML += '<div class="jumbotron">' +
								'<h6> IssueID: ' + id + '</h6>'+
								'<p><span class="label label-info">' + status + '</span></p>' +
								'<h3>' + desc + '</h3>' +
								'<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>' +
								'<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' +
								'<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>' +
								'<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>' +
								'</div>';	

	}
}