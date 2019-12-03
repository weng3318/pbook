
(function () {
    function setNativeValue(element, value) {
        let lastValue = element.value;
        element.value = value;
        let event = new Event("input", { target: element, bubbles: true });
        event.simulated = true;
        let tracker = element._valueTracker;
        if (tracker) {
            tracker.setValue(lastValue);
        }
        element.dispatchEvent(event);
    }

    var input = document.querySelectorAll("input");
    setNativeValue(input[0], "dragonqoo1988@gmail.com");
    setNativeValue(input[1], "林暐哲");
    setNativeValue(input[2], "Luke");
    setNativeValue(input[3], "a123");
    setNativeValue(input[4], "a123");

})()


    (function () {
        function setNativeValue(element, value) {
            let lastValue = element.value;
            element.value = value;
            let event = new Event("input", { target: element, bubbles: true });
            event.simulated = true;
            let tracker = element._valueTracker;
            if (tracker) {
                tracker.setValue(lastValue);
            }
            element.dispatchEvent(event);
        }

        var input = document.querySelectorAll("input");
        setNativeValue(input[1], "0921123456");
        setNativeValue(input[2], "dragonqoo1988@gmail.com");
    })()

