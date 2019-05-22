function createSelection(value, options, fieldName, msgCancel) {
    return new Promise((resolve, reject) => {
        if (!value || options.indexOf(value) < 0) {
            console.warn("Select %s: ", fieldName.toUpperCase());
            const shellSelection = require('select-shell')(
                {
                    pointer: '► ',
                    pointerColor: 'green',
                    style: "bold",
                    checked: ' ✓',
                    unchecked: '',
                    checkedColor: 'green',
                    msgCancel: msgCancel || 'No selected options!',
                    msgCancelColor: 'red',
                    multiSelect: false,
                    inverse: false,
                    prepend: false,
                    disableInput: true
                }
            );
            options.forEach(o => shellSelection.option(o));
            shellSelection.list();
            shellSelection.on('select', (data) => {
                resolve(data[0].value);
            });
            shellSelection.on('cancel', reject);
        } else {
            resolve(value);
        }
    });
}

module.exports = createSelection;
