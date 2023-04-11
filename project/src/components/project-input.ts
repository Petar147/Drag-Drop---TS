import { Component } from "./base-component.js";
import {Validatable, validate} from '../util/validation.js'
import { autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";


  // ProjectInput class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;

      this.configure();
    }

    private clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }

    // return type will be a tuple or void if autentification fails
    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
      };
      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
      const peopleValidatable: Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };

      //validation, if any of these is false
      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert("Invalid input, please try again!");
        return;
      } else {
        //parse to int
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }
    configure() {
      //get input elements === CAST as HTMLInputElement, Casting is the process of overriding a type.

      this.hostElement.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}

    @autobind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      //we are checking if it is a Tuple bu checking if it is an array. We can not check for Tuple type
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        //add our singleton, projectState
        projectState.addProject(title, desc, people);
      }
      this.clearInputs();
    }

    //   private configure() {
    //     //we bind because this will not point where we want, argument that we pass is what the this will refer to inside of the to be executed function
    //     //so this in submitHandler will refer to same thing inside the addEventListener as it does in submitHandler function
    //     this.hostElement.addEventListener("submit", this.submitHandler.bind(this));
    //   }
  }

