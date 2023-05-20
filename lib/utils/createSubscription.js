import { useState, useEffect, useRef } from "react";

/**
 * Allows multiple components to share a data source. The data source is setup when the first component is created and closed when the last component is destroyed.
 * @param {function} onSubscribe - called when the first subscriber is registered
 * @returns [useSubscription, subscribe, dispatch]
 */
export default function createSubscription(onSubscribe) {
  const subscribers = [];
  let onUnsubscribe;
  let currentData;
  const subscribe = function (onNewData) {
    subscribers.push(onNewData);
    if (subscribers.length === 1) {
      onUnsubscribe = onSubscribe(dispatch);
    }
    if (currentData !== undefined) onNewData(currentData);
    return unsubscribe;
  };
  const unsubscribe = function (setData) {
    const index = subscribers.indexOf(setData);
    if (index > -1) {
      subscribers.splice(index, 1);
    }
    if (subscribers.length === 0) {
      if (onUnsubscribe) onUnsubscribe();
    }
  };
  const dispatch = function (data) {
    currentData = data;
    /**Update parents first in case of child assumptions */
    subscribers.forEach((e) => e(data));
  };
  return [
    function useSubscription() {
      const [data, setData] = useState(currentData);
      useEffect(function () {
        return subscribe(setData);
      }, []);
      return data;
    },
    subscribe,
    dispatch,
  ];
}
