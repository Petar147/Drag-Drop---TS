
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateID: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      //'!' says that it will not be null    with 'as' we tell TS that it will be this type of element
      this.templateElement = document.getElementById(
        templateID
      )! as HTMLTemplateElement;
      this.hostElement = document.getElementById(hostElementId)! as T;
      //rendering elements to the DOM, we can add it to constructor
      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild as U;
      //add ID to the element so that css can be applied
      if (newElementId) {
        this.element.id = newElementId;
      }
      this.attach(insertAtStart);
    }

    private attach(insertAtBeginning: boolean) {
      this.hostElement.insertAdjacentElement(
        insertAtBeginning ? "afterbegin" : "beforeend",
        this.element
      );
    }
    //abstract method = concrete implementation is missing
    abstract configure(): void;
    abstract renderContent(): void;
  }
