Template.library.helpers({
    lists: [{
	    type: 'catalog', //accepts: generic, details, article
	    paginate: true, //Default is false
	    perPage: 10, //if paginate:true, how many before paginate
	    style: 'striped',
	    //If catalog
	    items: [{
	        title: 'There is diversity Within Diversity: Community Leaders Views on increasing diversity in youth serving organizations.',
	        id: 1,
	        byline: 'Sumru Erkut, et al., Center for Research on Women, 1993',
	        id: 'summerWebinars',
	        callNumber: '6504S',
	        copies: 1,
	        subjectHeadings: 'Ethnology -- United States. Minority teenagers -- United States -- Societies and clubs.',
	        classification: 'Organizational',
	        category: 'Organizational Material',
	        type: 'Book or Booklet',
	        status: {
	            type: 'transit',
	            style: 'neutral',
	            text: 'In Transit',
	        }
	    },{
	        title: 'There is diversity Within Diversity: Community Leaders Views on increasing diversity in youth serving organizations.',
	        id: 2,
	        byline: 'Sumru Erkut, et al., Center for Research on Women, 1993',
	        id: 'summerWebinars',
	        callNumber: '6504S',
	        copies: 1,
	        subjectHeadings: 'Ethnology -- United States. Minority teenagers -- United States -- Societies and clubs.',
	        classification: 'Organizational',
	        category: 'Organizational Material',
	        type: 'Book or Booklet',
	        status: {
	            type: 'transit',
	            style: 'neutral',
	            text: 'In Transit',
	        }
	    }]
	}]
});





/*



<template name="library">
    <li class="active library">
        {{> librarySearchHeader}}
        <ul class="resourcesItems library stripes">
            {{>backToResourcesMobile}}
            <li class="mainTitle dtHide"><h2>Library</h2></li>
            <!--{{#each libraryItem}}-->
                <!--Library Item Loop Template-->
            <!--{{/each}}-->
            {{> libraryItem }}
            {{> libraryItem }}
            {{> libraryItem }}
            {{> libraryItem }}
            {{> loadMore }}
        </ul>
    </li>
</template>


<template name="librarySearchHeader">
    <header class="librarySearchHeader">
        <h2>Library Results</h2>
        <dl class="breadcrumb">
            <!--These List Items should only show based on user's filter selection-->
            <dt class="fa" title="search terms">&#xf002;</dt>
            <dd>"Survivor Stories"</dd>
            <dt class="fa" title="classification">&#xf0b1;</dt> 
            <dd>Providers</dd>
            <dt class="fa" title="category">&#xf07c;</dt>
            <dd>Resources</dd>
            <dt class="fa" title="material">&#xf02d;</dt>
            <dd>Book or Booklet</dd>
            <dt class="count"></dt>
            <dd class="count">24 results</dd>
        </dl>
    </header>
</template>

<template name="libraryItem">
    <li>
        <div class="inner">
            <details>
                <summary>
                    <h5>
                        "There is diversity Within Diversity": Community Leaders' Views on increasing diversity in youth serving organizations.
                    </h5>
                    <p class="meta">Sumru Erkut, et al., Center for Research on Women, 1993</p>
                </summary>
                {{> libraryItemDetails}}
            </details>
            <aside class="info">
                <dl class="material">
                    <dt>Material</dt>
                    {{>materialType}}
                </dl>
                <dl class="status">
                    <dt>Status</dt>
                    {{>statusStockAvailable}}
                </dl>
                {{> libraryItemTools}}
            </aside>
        </div>
    </li>
</template>


<template name="statusStockAvailable"><dd class="statusStockAvailable">Available</dd></template>
<template name="statusStockUnavailable"><dd class="statusStockUnavailable">Unavailable</dd></template>

<template name="materialType">
    <dd>Book or Booklet</dd>
</template>


<template name="libraryItemDetails">
    <dl>
      <dt>Call Number</dt>
      <dd>6504S</dd>
      <dt>Copies</dt>
      <dd>1</dd>
      <dt>Subject Headings</dt>
      <dd>Ethnology -- United States. Minority teenagers -- United States -- Societies and clubs.</dd>
      <dt>Classification Type</dt>
      <dd>Organizational</dd>
      <dt>Category Type</dt>
      <dd>Organizational</dd>
      <dt>Material Type</dt>
      <dd>Book or Booklet</dd>
    </dl>
</template>

<template name="libraryItemTools">
    <!--Each should only be rendered on the page if applicable-->
    {{#if currentUser}}
        <div class="availability">
            {{> requestButton}}
            <!--Display no 'requestButton' if item unavailable-->
            <!--{{> requestResults}}-->
            <!--'requestResults' template to replace 'requestButton' on button submit-->

        </div>
    {{else}}
        <div class="availability">
            {{> loginToRequest}}
        </div>
    {{/if}}
</template>

<!--Library Item Variables-->
<template name="requestResults">
    <div class="requestResults">
        {{> requestSuccess}}
        {{> requestFailed}}
    </div>
</template>

<template name="requestButton">
    <button class="requestLibraryItem">Request Copy</button>
</template>

<template name="loginToRequest">
    <span class="loginToRequest"><button>Login</button> to Request Copy</span>
</template>                


<template name="requestSuccess">
    <p class="requestSuccess requestResult">
        <span class="fa">&#xf058; </span>
        This item has been requested. Someone at the library will be in touch soon.
        <button class="undoRequest">Undo</button>
    </p>
</template>

<template name="requestFailed">
    <p class="requestFailed requestResult">
        <span class="fa">&#xf057; </span>
        This item could not be requested at this time. Please try again later.
    </p>
</template>



*/