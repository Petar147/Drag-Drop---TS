
  // autobind decorator, decorator automatically binds this keyword
 export function autobind(
    // naming properties with _ hint to javascript that we do not attend to use those properties (value not assigned)
    _: any,
    _2: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }

