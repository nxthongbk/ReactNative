import Colors from './Colors';

const searchContainerBackground = Colors.grey3;
const searchTextColor = Colors.grey5;
const inputTextColor = Colors.grey1;

export const ButtonStyle = {

};

export const InputStyle = {
  inputText: {
    // color: Colors.textColor,
    fontSize: 15,
    marginLeft: 0
  },
  inputTextarea: {
    // color: Colors.textColor,
    fontSize: 15,
    marginLeft: 0,
    height: 100,
    flex: 1
  },
};

export const PickerStyle = {
  pickerFont: {
    fontSize: 15,
    color: '#cccccc'
  }
};

export const DatePickerStyle = {
  datePicker: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    alignItems: 'flex-start',
    marginLeft: 0
  },
};

export const CalendarStyle = {
  calendar: {
    paddingTop: 5,
    borderColor: '#eee',
    //justifyContent: 'center'
  }
};

export const NavBar = {
  navBarModal: {
    backgroundColor: Colors.primary
  },
  NavBarText: {
    color: Colors.wt,

  },
};

export const InputWidgetStyle = {
  rowContainer: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 2,
    backgroundColor: Colors.inputBackground,
    marginBottom: 13,
  },
  row: { height: 41 },
  textInputInline: {
    fontSize: 14,
    color: inputTextColor
  },
  rowImage: {
    marginLeft: 10
  }
};

export const HeaderNavStyles = {
  NavBar: {
    headerStyle: { backgroundColor: Colors.primary },
    headerTintColor: Colors.wt,
  }
};

export const SearchBarStyle = {
  searchContainer: {
    backgroundColor: searchContainerBackground
  },
  searchInput: {
    backgroundColor: Colors.wt,
    height: 30,
    color: searchTextColor,
    fontSize: 14
  },
  clearIcon: {}
};

export const ModalWidgetStyle = {
  title: {
    display: 'none'
  },
  rowContainer: {
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.inputBorder,
    borderRadius: 2,
    backgroundColor: Colors.inputBackground,
    paddingLeft: 10,
    height: 43,
    marginBottom: 13
  },
  row: { height: 41 },
  text: { fontSize: 14, color: Colors.text }
};

export const CheckBoxWidgetStyle = {
  textStyle: {
    fontSize: 14
  }
};

export const TextAreaWidgetStyle = {
  textAreaRow: {
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    backgroundColor: Colors.inputBackground,
    borderRadius: 2,
    alignItems: 'stretch',
    marginBottom: 13
  },
  textArea: {
    color: inputTextColor,
    fontSize: 14
  }
};
