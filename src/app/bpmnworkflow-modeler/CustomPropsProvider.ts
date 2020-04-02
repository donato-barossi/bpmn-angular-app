import {EntryFactory, IPropertiesProvider} from './bpmn-js';

export class CustomPropsProvider implements IPropertiesProvider {

  static $inject = ['translate', 'bpmnPropertiesProvider'];

// Note that names of arguments must match injected modules, see InjectionNames.
  constructor(private translate, private bpmnPropertiesProvider) {
  }

  getTabs(element) {
    console.log(this.constructor.name, 'Creating property tabs');
    const inputEntries: Array<any> = [];
    if (element.businessObject.ioSpecification.dataInputs.length > 0 ) {
      element.businessObject.ioSpecification.dataInputs.forEach(element => {
        inputEntries.push(EntryFactory.textBox({
          id: element.id,
          label: this.translate(element.name),
          modelProperty: element.name
        }));
      });
    }

    return this.bpmnPropertiesProvider.getTabs(element)
      .concat({
        id: 'parameters',
        label: this.translate('Parameters'),
        groups: [
          {
            id: 'input-parameters',
            label: this.translate('Input Parameters'),
            entries: inputEntries
          },
          {
            id: 'output-parameters',
            label: this.translate('Output Parameters'),
            entries: [
              EntryFactory.textBox({
                id: 'custom',
                label: this.translate('customText'),
                modelProperty: 'customText'
              }),
            ]
          }
        ]
      });
  }
}
