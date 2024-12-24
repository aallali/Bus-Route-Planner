import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
 
const animatedComponents = makeAnimated();

export function MultiSelectDropdown({allOptions, onChangeCategories}) {
    const getSelectedVals = inputValue => { // whole object of selected option 
        if (inputValue.length) {
            onChangeCategories(inputValue.map(l => l.value))
        } else {
            console.log("here we go")
            onChangeCategories([""])
        }
    };
    return (
 
          <div className="col-md-6">
            <Select options={[...allOptions]} components={animatedComponents} 
              isMulti onChange={getSelectedVals}/>
          </div>
  
    );
  
 
}
 
export default MultiSelectDropdown;