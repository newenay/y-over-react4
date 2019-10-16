export const cancelablePromise = promise => {
    let hasCanceled = false;
  
    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(
        value => (hasCanceled ? reject({ isCanceled: true, value }) : resolve(value)),
        error => reject({ isCanceled: hasCanceled, error }),
      );
    });
  
    return {
      promise: wrappedPromise,
      cancel: () => (hasCanceled = true),
    };
  };