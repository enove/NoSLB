//tabs.js are the events and functions associated with UI tabs.
Meteor.tabsFunctions = {
	toggleTabs : function(){
	    // Tabs Variables
	    var toggle = document.querySelectorAll('[aria-controls][data-toggle=tabs]');
	    var content = document.querySelectorAll('div.tabs > [aria-hidden]');
	    if(event.target.hasAttribute('aria-controls') && event.target.getAttribute('aria-expanded') == 'false'){
	        for (var i = 0, e; e = toggle[i]; i++) { active(e,false); }   
	        active(event.target, true);
	        for (var i = 0, e; e = content[i]; i++) {
	            hidden(e,true); //Clear all active content
	            if ('#' + e.getAttribute('id') == event.target.getAttribute('aria-controls')){ //If Sidebar ID matches toggles' data-sidebar
	                hidden(e,false); //Add active class to given sidebar
	            }
	        }        
	    }
	}
}

//Define Usage
t = Meteor.tabsFunctions;

Template.body.events({
    //Tabs
    'click [data-toggle=tabs]': function (event) { t.toggleTabs(); },
});