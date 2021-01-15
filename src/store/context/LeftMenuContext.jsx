import React, { Component, createContext } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'

import 'jqueryui'

import '../../../node_modules/react-toastify/dist/index'
export const LeftMenuContext = createContext();

export class LeftMenuContextProvider extends Component {

  state = {
    dragAndDroppedModuleNames: [],
    lastDraggedModuleName: "",
    leftMenuOpen: false,
    modulesOpened: '' //unique id or reference to module clicked and opened in modal...
  }

  toggleLeftMenu = this.toggleLeftMenu.bind(this)
  removeGridItemHandler = this.removeGridItemHandler.bind(this)
  lastDraggedItemHandler = this.lastDraggedItemHandler.bind(this)


  componentDidMount() {
    this.props.onload && this.props.onload()
    this.leftMenuGridContainer = $('.react-grid-layout.left-menu-grid')
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { dragAndDroppedModuleNames } = this.state;
    let { lastDraggedModuleName: newModuleDroppedModule } = nextState;

    if(dragAndDroppedModuleNames.length < nextState.dragAndDroppedModuleNames.length) {
      this.showUndoDropItemToasts(`Undo ${newModuleDroppedModule.replace('-card-elm', '')} drop`, newModuleDroppedModule)
    }
    return true
  }

  toggleLeftMenu(toggledState) {
    this.setState({
      leftMenuOpen: toggledState || !this.state.leftMenuOpen
    })
  }

  parseAndTrimModuleName(trimmedModuleName="") {
    return _.replace(_.trim(trimmedModuleName), "-card-elm", "");
  }

  showUndoDropItemToasts(msg='testicles one two', droppedModuleItem) {
    let UndoButtonToastMsg = ({ closeToast, toastProps }) => (
      <Button onClick={() => {this.undoItemDrop(droppedModuleItem)}}>
        <FontAwesome name="undo" />&nbsp;<small>{msg}</small>
      </Button>
    )

    toast.dark(UndoButtonToastMsg)
  }


  undoItemDrop(droppedModuleItem) {
    let droppedModules = this.state.dragAndDroppedModuleNames;
    let dragAndDroppedModuleNames = droppedModules.filter(item => item !== droppedModuleItem)

    this.setState({
      dragAndDroppedModuleNames
    })
  }

  /**
   * lastDraggedItemHandler: adds last dragged dashboard module data to state or list
   * @param  {String|Event}  moduleName=null     name of last dragged dashboad module
   * @param  {Boolean} addToDroppedModulesArr=false add name of dragged module to dropped-modules state
   */
  lastDraggedItemHandler(moduleName=null, addToDroppedModulesArr=false) {
    const lastDraggedModuleName = _.isObject(moduleName) ? moduleName.target.children[0].children[0].classList[0] : (moduleName || '')
    const dragAndDroppedModuleNames = _.uniq(_.filter([...this.state.dragAndDroppedModuleNames, addToDroppedModulesArr ? lastDraggedModuleName : '']))

    console.log(`\n\n____ lastDraggedItemHandler arg: '%s'`, lastDraggedModuleName);

    this.setState({
      lastDraggedModuleName,
      dragAndDroppedModuleNames
    })
  };

  removeGridItemHandler({ currentTarget }) {
    const droppedModules = this.state.dragAndDroppedModuleNames
    const [ , moduleName="" ] = $(currentTarget).parent().get(0).classList
    const moduleNameFormatted = _.replace(_.snakeCase(moduleName), /_/g, ' ');
    const droppedItemArrIndex = _.findIndex(droppedModules, item => _.startsWith(item, moduleName));
    const removeItemConfirmationFn = (dialogHelper, droppedModulesUpdated=this.state.dragAndDroppedModuleNames) => {
      if(droppedItemArrIndex < 0) return;

      droppedModulesUpdated.splice(droppedItemArrIndex,1)

      this.setState({
        dragAndDroppedModuleNames: droppedModulesUpdated
      }, () => {
        dialogHelper.dialog("close")
      })
    };

    $(`<span id="leftMenuItemRemoveDialog">Remove ${moduleNameFormatted}?</span>`).dialog({
      // modal: true,
      title: "Removal Confirmation",
      resizable: false,
      draggable: false,
      minWidth: 400,
      buttons: [
        {
          // text: "",
          showText: false,
          icon: "ui-icon-check",
          click: function() {
            removeItemConfirmationFn($(this))
          }
        },
        {
          // text: "",
          showText: false,
          icon: "ui-icon-cancel",
          click: function() {
            $(this).dialog("close")
          }
        }
      ]
    });
  }


  render () {
    return (
      <LeftMenuContext.Provider value={
        {
          onDropOfDraggedItemHandler: this.onDropOfDraggedItemHandler,
          lastDraggedItemHandler: this.lastDraggedItemHandler,
          parseAndTrimModuleName: this.parseAndTrimModuleName,
          removeGridItemHandler: this.removeGridItemHandler,
          toggleLeftMenu: this.toggleLeftMenu,
          ...this.state
        }
      }>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />

        {this.props.children}

      </LeftMenuContext.Provider>
    )//END return
  }//END render
}///END <Provider />



{/* REACT-TOASTIFY EXAMPLES:

 toast('🦄 Wow so easy!', {
   position: "top-right",
   autoClose: 5000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
 });

<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>

  const toastId = React.useRef(null);

  const notify = () => toastId.current = toast("Hello", { autoClose: false });

  const update = () => toast.update(toastId.current, { type: toast.TYPE.INFO, autoClose: 5000 });

  return (
    <div>
      <button onClick={notify}>Notify</button>
      <button onClick={update}>Update</button>
    </div>


// With a string
 toast.update(toastId, {
    render: "New content",
    type: toast.TYPE.INFO,
    autoClose: 5000
  });

// Or with a component
toast.update(toastId, {
    render: MyComponent
    type: toast.TYPE.INFO,
    autoClose: 5000
});

toast.update(toastId, {
    render: () => <div>New content</div>
    type: toast.TYPE.INFO,
    autoClose: 5000
});


const myNewToastId = 'loremIpsum';

toast.update(toastId, {
  render: "New content",
  type: toast.TYPE.INFO,
  autoClose: 5000,
  toastId: myNewToastId
});

toast.update(myNewToastId, {
  render: MyComponent
  autoClose: 6000
});
*/}
