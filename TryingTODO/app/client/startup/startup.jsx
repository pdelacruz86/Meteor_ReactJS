/**
 * Created by pdelacruz on 9/26/15.
 */
if (Meteor.isClient) {
    // This code is executed on the client only

    Meteor.startup(function () {
        // Use Meteor.startup to render the component after the page is ready
        React.render(<Home />, document.getElementById("render-target"));
    });
}