/** closure to inflate a menu with closure examples

 settings contain
 parent


 requires
 menu
 **/
function createClosureLibrary(settings) {
    var mContainer;
    var mContent;
    var mMenu;
    var mFunctionTableBody;
    var mInflators = {};//map from menu-key to inflaters
    let mPresentationHelper = createPresentationHelper();
    inflate();
    setup();

    setupCSS();

    function inflate() {
        mContainer = $("<div/>").addClass("closure-libary-container");
        settings.parent.append(mContainer);
        mContent = $("<div/>").addClass("content-container");
        mContainer.append(mContent);
    }

    function setup() {
        mFunctionTableBody = undefined;
        mMenu = createMenu({
            "parent": mContainer,
            "menuTitle": "Elaspix UI Library",
            "logourl": "pics/favicon.ico"
        });


        let inflatorTextBased = createInflatorTextBased({"parent": mContent});
        let inflatorButtonDropdown = createInflatorButtonsDropdowns({"parent": mContent});
        let inflatorDialogs = createInflatorDialogs({"parent": mContent});
        let inflatorModals = createInflatorModals({"parent": mContent});
        let inflatorTables = createInflatorTables({"parent": mContent});
        let inflatorNavigation = createInflatorNavigation({"parent": mContent});
        let inflatorSliders = createInflatorSliders({"parent": mContent});
        let inflatorColors = createInflatorColors({"parent": mContent});
        let inflatorMenu = createInflatorMenu({"parent": mContent});
        let inflatorCards = createInflatorCards({"parent":mContent});
		var inflatorCharts = createInflatorCharts({"parent":mContent});

        mInflators["textbased"] = inflatorTextBased;
        mInflators["buttons"] = inflatorButtonDropdown;
        mInflators["dialogs"] = inflatorDialogs;
        mInflators["modals"] = inflatorModals;
        mInflators["tables"] = inflatorTables;
        mInflators["nav"] = inflatorNavigation;
        mInflators["sliders"] = inflatorSliders;
        mInflators["colors"] = inflatorColors;
        mInflators["menu"]= inflatorMenu;
        mInflators["cards"]= inflatorCards
		mInflators["charts"]= inflatorCharts;


        mMenu.addDropdown("Menu","menu",preview,"menu")
        mMenu.addDropdownItem("menu","menu",onInflateClosure);

        mMenu.addDropdown("Text-based", "textbased", preview,);
        mMenu.addDropdownItem("textbased", "InputText", onInflateClosure);
        mMenu.addDropdownItem("textbased", "inputTextArea", onInflateClosure);
        mMenu.addDropdownItem("textbased", "inputTextButton", onInflateClosure);

        mMenu.addDropdown("Buttons & Dropdowns", "buttons", preview,);
        mMenu.addDropdownItem("buttons", "ButtonBusy", onInflateClosure);
        mMenu.addDropdownItem("buttons", "Dropdown", onInflateClosure);
        mMenu.addDropdownItem("buttons","dropdownButton",onInflateClosure);
        mMenu.addDropdownItem("buttons", "listNewDropdown", onInflateClosure);
        mMenu.addDropdownItem("buttons", "lookupDropdown", onInflateClosure);

        mMenu.addDropdown("Dialogs", "dialogs", preview,);
        mMenu.addDropdownItem("dialogs", "Login", onInflateClosure);
        mMenu.addDropdownItem("dialogs", "draggableArea", onInflateClosure);
        mMenu.addDropdownItem("dialogs","collapser",onInflateClosure);
        mMenu.addDropdownItem("dialogs", "slider", onInflateClosure);
        mMenu.addDropdownItem("dialogs", "sliderWithEdit", onInflateClosure)
        mMenu.addDropdownItem("dialogs", "switch", onInflateClosure)
        mMenu.addDropdownItem("dialogs", "switchCentral", onInflateClosure)



        mMenu.addDropdown("Modals", "modals", preview,);
        mMenu.addDropdownItem("modals", "Toast", onInflateClosure);
        mMenu.addDropdownItem("modals", "Modal", onInflateClosure);

        mMenu.addDropdown("Cards","cards",preview);
        mMenu.addDropdownItem("cards","tagCard",onInflateClosure)
        mMenu.addDropdownItem("cards","imageText",onInflateClosure)
        mMenu.addDropdownItem("cards","mediaCard",onInflateClosure)
        mMenu.addDropdownItem("cards","imageButton",onInflateClosure)
        mMenu.addDropdownItem("cards","imageTextButton",onInflateClosure)
        mMenu.addDropdownItem("cards","imageButtonHolder",onInflateClosure)

        mMenu.addDropdown("Tables", "tables", preview,);
        mMenu.addDropdownItem("tables", "buttonTable", onInflateClosure);
        mMenu.addDropdownItem("tables", "clickTable", onInflateClosure);

        mMenu.addDropdown("Navigation", "nav", preview,);
        mMenu.addDropdownItem("nav", "navtabs", onInflateClosure);
        mMenu.addDropdownItem("nav", "navpills", onInflateClosure);
        mMenu.addDropdownItem("nav", "navpillsTop", onInflateClosure);

        mMenu.addDropdown("Sliders", "sliders", preview,);
        mMenu.addDropdownItem("sliders", "slider", onInflateClosure);
        mMenu.addDropdownItem("sliders", "sliderWithEdit", onInflateClosure);

        mMenu.addDropdown("Color-Select", "colors", preview,)
        mMenu.addDropdownItem("colors", "colorCards", onInflateClosure)
        mMenu.addDropdownItem("colors", "colorCardsFull", onInflateClosure)
        mMenu.addDropdownItem("colors", "colorfan", onInflateClosure)
		
		mMenu.addDropdown("Charts", "charts", preview);
        mMenu.addDropdownItem("charts", "barChart", onInflateClosure);
        mMenu.addDropdownItem("charts", "lineChart", onInflateClosure);


        //mMenu.addMenuItem("elaspix.de",undefined,"https://elaspix.de");
		
		text("","Elaspix Closure Library");
		//mContent.append($("<h3/>").text("Elaspix Closure Library"));
		
		
		mContent.append($("<p/>").html('<a href="download/closureLibrary_07.12.22.zip">Download v07.12.22</a>'));
		
		text("","Release-Log");
		text("Version 07.12.22 tagCard added","");
		text("Version 06.12.22 barChart, lineChart added","");
		text("Version 01.12.22 Initialer Release","");
		
		mContent.append($("<small/>").addClass("text-muted").text("Eine auf Bootstrap 5 basierende UI-Library zusammengestellt von Tobias Günther mit Hilfe von Elvis Herbrandt"));
    }

    function preview(aNavMenu) {
        mContent.empty()
        // noinspection JSVoidFunctionReturnValueUsed
        switch (aNavMenu) {
            case "textbased":
                text("","Text-Based")

                text("A very basic input-text-field with label and hint.", "inputText");
                let inputText = createInputText({
                    "parent": parent(),
                    "id": "myid",
                    "labelText": "The label",
                    "inputPlaceholder": "the placeholder when empty",
                    "inputType": "text",
                    "hintText": "A small text to give some hint what should be overlooked.",
                    "width": "100%",
                    "marginBottom": "2em"
                });

                text("similar to inputText, this is for user input, but provides a scalable input area", "inputTextArea");
                let inputTextArea = createInputTextArea({
                    "parent": parent(),
                    "id": "inputTextArea",
                    "labelText": "Label-Text here",
                    "inputPlaceholder": "input placeholder here",
                    "inputType": "text",
                    "hintText": "hint here",
                    "width": "80%",
                    "rows": "10",
                    "cols": "10",
                    "marginBottom": "5%",
                    "paddingBottom": "5%",
                    "labelVerticalAlign": "top",
                    "display": "block",
                })

                text("closure to allow editing a name to save it", "inputTextButton")
                let inputTextButton = createInputTextButton({
                    "parent": parent(),
                    "id": "inputTextButton",
                    "placeholder": "placeholder here",
                    "buttonText": "button text",
                    "label": "label here",
                    "help": "help here",
                })


                break;

            case "buttons":
                text("","Buttons & Dropdowns")
                text("A Button with Busy-Spinner.", "buttonBusy");
                text("It is used very often in an AJAX-Scenario where some time elapses until the server answers.");
                let buttonBusy = createButtonBusy({
                    "parent": parent(),
                    "title": "The Title",
                    "cssClass": "btn-primary"
                });
                buttonBusy.showBusyIcon(true);

                text("Shows a Dropdown with a Button and Dropdown-Menu.", "dropdown");
                text("The Values are provided as JSON-Array separating shown-label und internal-label.");
                let dropdown = createDropdown({
                    "parent": parent(),
                    "id": "my-dropdown-id",
                    "labelText": "The Label",
                    "titleText": "The Title",
                    "listValues": {"Value 1": "value_1", "Value 2": "value_2", "Value 3": "value_3"},
                    "width": "100%"
                });
                dropdown.setHintText("The Hint.");

                text("closure for a dropdown with an attached button","dropdownButton")
                let dropdownButton = createDropdownButton({
                    "parent":parent(),
                    "id":"dropdownButton",
                    "labelText": "label here",
                    "type": "button",
                    "buttonText": "button text",
                    "listValues": ["value0","value1","value2"],
                    "width": "80%",

                })

                text("A dropdown that allows for new entries at runtime and filtering", "listNewDropdown");
                let listNewDropdown = createListNewDropdown({
                    "parent": parent(),
                    "id": "listNewDropdwn",
                    "placeholder": "placeholder here",
                    "dropdownText": "text above dropdown selector",
                    "buttonText": "text on submit button",
                    "help": "tag for help messages",
                })
                listNewDropdown.fill({"key1": "entry1", "key2": "entry2"})

                text("A dropdown that allows for filtering entries, 'look them up', similar to listNewDropdown with less features", "lookupDropdown");
                let lookupDropdown = createLookupDropdown({
                    "parent": parent(),
                    "id": "lookupDropdown",
                    "placeholder": "placeholder here",
                    "help": "help here",
                    "rightButtonText": "text on right button",
                    "witdh": "80%",
                })
                lookupDropdown.fill(["item1", "item2", "item3"])
                break

            case "dialogs":

                text("","Dialogs")
                text("Shows a Login-Dialog with email and password input and a login-button.", "Login");
                text("Provide your own Cloud-Controller as datastoreManager inside the login-closure to check for a valid password.");
                text("Looks best inside a static modal-Menu.");

                let parentContainer = parent();
                let login = createLogin({"parent": parentContainer});

                parentContainer.addClass("pb-5");
                login.show();

                text("Creates a draggable area, to let the user set the size of something", "DraggableArea");
                let draggableArea = createDraggableArea({
                    "parent": parent(),
                    "valueWidth": 3,
                    "valueDepth": 1.5,
                    "widthMin": 1,
                    "widthMax": 5,
                    "depthMin": 1,
                    "depthMax": 5,
                    "minHandlePercent": 0,
                    "width": "90%",
                    "unit": "m",
                    "label": "Set label here",
                    "labelPadding": "5%",
                    "scaleHeight": 0.3,
                    "depthMaxPercent": 25,
                })


                text("A closure for Bootstrap 5 switches and checkboxes. The top version has 'isCheckbox' set true", "Switch")
                let elaspixSwitch = createSwitch({
                    "parent": parent(),
                    "id": "elaspixSwitch",
                    "isclicked": "clicked",
                    "notclicked": "not clicked",
                    "isCheckbox": true,
                    "isClickedLabel": "clicked label here",
                    "notClickedLabel": "not clicked label here",
                })

                text("Closure for Boostrap 5 switches witch central switch, left and right are modes", "switchCentral")
                let switchCentral = createSwitchCentral({
                    "parent": parent(),
                    "id": "switchCentral",
                    "isclicked": "clicked",
                    "notclicked": "not clicked",
                    "forceMobile": true,
                    "labelElement": "span",
                    "hintIntermediate": "hint between both labels"
                })


                break

            case "modals":
                text("","Modals")
                text("Shows a Toast that is used to provide small hints or feedback to the user.", "Toast");
                text("Besides inflating your very own instance, the menu already holds a toast for you that you can access using menu.showToast().");
                let toast = createToast({"parent": parent()});
                toast.show("The Message", "The Title", "text-success");

                text("Shows a Modal visually blocking the current screen.", 'Modal');
                text("Besides inflating your very own instance, the menu already holds a modalDialoge for you that you can access using menu.getModal().");
                let modal = createModalDialoge({"parent": parent()});
                //modal.show();

                break

            case "tables":
                text("","Tables")
                text("A table that has a button at the end of each row, useful for data interaction", "buttonTable");
                let buttonTable = createButtonTable({
                    "parent": parent(),
                    "head": ["head1", "head2", "head3"],
                    "indexKey": 0,
                    "indexTimestamp": 1,
                    "hideKey": true,
                    "valueType": "html",

                })
                buttonTable.addRow(["data01", "data02", "data03"], "buttonText0");
                buttonTable.addRow(["data11", "data12", "data13"], "buttonText1");

                text("A table where the rows are clickable", "clickTable")
                let clickTable = createClickTable({
                    "parent": parent(),
                    "head": ["head1", "head2", "head3"],
                    "indexKey": 0,
                    //"indexTimestamp":1,
                    "hideKey": true,
                })
                clickTable.addRow(["data01", "data02", "data03"]);
                clickTable.addRow(["data11", "data12", "data13"]);


                break

            case "nav":

                let fillerText = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod" +" tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. " + "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren," + " no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, " + "consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore " + "magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea " + "rebum. Stet clita kasd gubergren," + " no sea takimata sanctus est Lorem ipsum dolor sit amet."
                let fillerText2 = "this is a second filler text, which is much shorter and also self-written, but this is purely to prove that another tab is actually loaded"
                text("","Navigation")
                text("creates a navigation menu that uses tabs", "navtabs");
                var navtabs = createNavtabs({
                    "parent": parent(),
                    "marginBottom": "5%",

                });
                 navtabs.addTab("tab1", "Tab1");
                navtabs.getBody("tab1").empty()
                navtabs.getBody("tab1").append(fillerText)
                navtabs.addTab("tab2", "Tab2");
                navtabs.getBody("tab2").empty()
                navtabs.getBody("tab2").append(fillerText2)
                navtabs.showBusyIcon("tab2",true)

                text("Navigation in form of Navpills", "navpills");
                let navpills = createNavpills({
                    "parent": parent(),
                })
                navpills.addTab("tab1", "Tab1");
                navpills.getBody("tab1").empty()
                navpills.getBody("tab1").append(fillerText)
                navpills.addTab("tab2", "Tab2");
                navpills.getBody("tab2").empty()
                navpills.getBody("tab2").append(fillerText2)

                text("closure for navigation tabs for mobile resolution in form of pills on the top" +
                    "  is a variant of elaspix_navpills", "navpillsTop")
                let navpillsTop = createNavpillsTop({
                    "parent": parent(),
                })
                navpillsTop.addTab("tab1", "Tab1");
                navpillsTop.getBody("tab1").empty()
                navpillsTop.getBody("tab1").append(fillerText)
                navpillsTop.addTab("tab2", "Tab2");
                navpillsTop.getBody("tab2").empty()
                navpillsTop.getBody("tab2").append(fillerText2)


                break

            case "sliders":
                text("","Sliders")
                text("Closure to manage a slider with labels", "slider");
                let slider = createSlider({
                    "parent": parent(),
                    "id": "slider",
                    "label": "label here",
                    "unit": "m",
                    "values": ["0", "1", "2", "3"],
                    "scale": [0, 5, 1],
                })

                text("closure to manage a slider with clickable, editable label", "sliderWithEdit");
                let sliderWithEdit = createSliderWithEdit({
                    "parent": parent(),
                    "id": "sliderWithEdit",
                    "label": "label here",
                    "unit": "m",
                    "imageURLPath": "",
                    "values": ["0", "1", "2"],
                    "scale": [0, 5, 1],
                    "tooltip": "tooltip here",
                })

                break;

            case "colors":
                let colorSorting = createColorsorting({
                    "RALCodes": elaspixRALCodes
                });
                text("","Color-Select")
                text("Closure to choose among color cards, tailored for mobile use only", "colorCards")
                let colorCards = createColorCards({
                    "parent": parent(),
                    "RALCodes": colorSorting.getColors(),
                    "height_vh": "30",
                    "startIndex": 100,
                    "label": "label here",
                })

                text("closure to choose among color cards, which span along the whole full width, desktop version", "colorCardsFull")
                let colorCardsFull = createColorCardsFull({
                    "parent": parent(),
                    "RALCodes": colorSorting.getColors(),
                    "height_card": "2em",
                    "height_container": "20em",
                    "label": "label here",
                    "startIndex": 100,
                    "useShowNames": true

                })

                text("closure to operate  a color fan", "colorfan")
                let colorfan = createColorfan({
                    "parent": parent(),
                    "RALCodes": colorSorting.getColors(),
                    "spare": 10,
                    "width": "80%",
                    "widthFan": "80%",
                    "label": "label here",
                    "startIndex": 100,

                })

                break;

            case "menu":
                text("","Menu")
                text("closure for providing a header with menu for bootstrap 5. Requires 'toast','modalDialoge' and 'login'","menu")
                let menu = createMenu({
                    "parent": parent(),
                    "menuTitle": "Menu title here",
                    "logourl": "pics/favicon.ico"
                })
                menu.addMenuItem("item0",)
                menu.addDropdown("dropdown0", "dropdown0")
                menu.addDropdownItem("dropdown0", "entry0",dummyInflate)
                menu.addDropdownItem("dropdown0", "entry1",dummyInflate)
                break;

            case "cards":
                text("","Cards")
				text("A default card with image, title, description and tags which are shown as pills", "tagCard");
                mInflators[aNavMenu].inflateClosure("tagCard",parent());
				
				text("Displays an image with a description text above", "imageText");
                mInflators[aNavMenu].inflateClosure("imageText",parent());
				
                text("A closure that wraps a media card, note that the CSS is fixed for now", "mediaCard");
                // noinspection JSVoidFunctionReturnValueUsed
                mInflators[aNavMenu].inflateClosure("mediaCard",parent());
				
                text("closure to hold a button with image and text, note that the button toggles between active states on click","imageButton")
                mInflators[aNavMenu].inflateClosure("imageButton",parent());
				

                text("closure to hold a button with image and Text aka swatch, providing close button, note that the close button is depending on the active-state of the button, so if it's not visible, click the button","imageTextButton")
                mInflators[aNavMenu].inflateClosure("imageTextButton",parent());
				

                text("Holds multiple imageButtons which are flex-placed","imageButtonHolder");
                mInflators[aNavMenu].inflateClosure("imageButtonHolder",parent());
                break
			
			
			case "charts":
				text("","Cards");
                text("a BarChart using the google Chart API", "barChart");
				mInflators[aNavMenu].inflateClosure("barChart",parent());
				text("a LineChart using the google Chart API", "lineChart");
				mInflators[aNavMenu].inflateClosure("lineChart",parent());
			break;


        }
    }

    function setupCSS() {
        mContent.addClass("pt-4");
        mContent.addClass("bg-light rounded-3 p-2");
    }

    function onInflateClosure(aName, aDropdownKey) {
        console.log("inflate closure", aName, aDropdownKey);
        mContent.empty();

        if (aDropdownKey != undefined && mInflators.hasOwnProperty(aDropdownKey)) {
            mInflators[aDropdownKey].inflate(aName);
        } else {
            console.log("This Tab doesn't exist, I don't know how you ended up here tbh")

        }
    }
    function dummyInflate(aName,aDropdownKey){
        console.log("inflate closure",aName,aDropdownKey);
    }

    function parent() {
        var wrapperContainer = $("<div/>").addClass("wrapper-container");
        mContent.append(wrapperContainer);
        wrapperContainer.addClass("bg-white m-5 p-2 rounded");
        return wrapperContainer;
    }

    function text(aText, aTitle) {
        mPresentationHelper.text(aText, aTitle, mContent);
    }

    function buttonOnClose(){
        console.log("close")
    }
    function buttonOnKebabClick(){
        console.log("kebab click")
    }

    return {}
}