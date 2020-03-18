console.log("Starting");

setTimeout(() => {
    console.log("Print this after 2000 mili seconds i.e 2 seconds");
}, 2000);

setTimeout(() => {
    console.log("Print this after 0 seconds");
}, 0);

console.log("Stop");

// *****************OUTPUT
// Starting
// Stop
// Print this after 0 seconds
// Print this after 2000 mili seconds i.e 2 seconds
// ----------------------------------------------

// This "Print this after 0 seconds" is printed after this "Stop"
// because "Event Loop" does not allow to run "Callback Queue" untill "Call Stack" is empty