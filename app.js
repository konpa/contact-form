contactForm = Framer.Importer.load("imported/contact-form")

contactForm.button.center()
contactForm.form.center()

/*
 * Initialise all values
 */
contactForm.button.style = {cursor:"pointer"}
contactForm.sendButton.style = {cursor:"pointer"}
contactForm.closeButton.style = {cursor:"pointer"}

contactForm.form.scale = 0
contactForm.name.properties = {opacity:0, y:contactForm.name.y-10}
contactForm.email.properties = {opacity:0, y:contactForm.email.y-10}
contactForm.message.properties = {opacity:0, y:contactForm.message.y-10}
contactForm.sendButton.properties = {opacity:0, y:contactForm.sendButton.y+10}
contactForm.sending.opacity = 0
contactForm.sent.opacity = 0

/*
 * Open form when cliking on contact button
 */
openForm = contactForm.button.on(Events.Click, function(event, layer) {

	// Hide contact button
	contactForm.button.visible = false

	// Open empty form box
	contactForm.form.animate({
		properties: {scale:1.0},
		time: 0.5,
		curve: "cubic-bezier(0.19, 1, 0.22, 1)"
	})

	// Show all fields
	contactForm.name.animate({
		properties: {opacity:1.0, y:contactForm.name.y+10},
		delay: 0.2,
		time: 0.5,
		curve: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
	})
	contactForm.email.animate({
		properties: {opacity:1.0, y:contactForm.email.y+10},
		delay: 0.2,
		time: 0.5,
		curve: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
	})
	contactForm.message.animate({
		properties: {opacity:1.0, y:contactForm.message.y+10},
		delay: 0.2,
		time: 0.5,
		curve: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
	})
	contactForm.sendButton.animate({
		properties: {opacity:1.0, y:contactForm.sendButton.y-10},
		delay: 0.2,
		time: 0.5,
		curve: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
	})

})

/*
 * Close form when cliking on close button
 */
contactForm.closeButton.on(Events.Click, function(event, layer) {

	// Hide all fields
	contactForm.name.animate({
		properties: {opacity:0, y:contactForm.name.y-10},
		time: 0.5,
		curve: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
	})
	contactForm.email.animate({
		properties: {opacity:0, y:contactForm.email.y-10},
		time: 0.5,
		curve: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
	})
	contactForm.message.animate({
		properties: {opacity:0, y:contactForm.message.y-10},
		time: 0.5,
		curve: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
	})
	contactForm.sendButton.animate({
		properties: {opacity:0, y:contactForm.sendButton.y+10},
		time: 0.5,
		curve: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
	})

	// Show contact button
	contactForm.button.visible = true

	// Close empty form box
	contactForm.form.animate({
		properties: {scale:0},
		delay: 0.5,
		time: 0.5,
		curve: "cubic-bezier(0.19, 1, 0.22, 1)"
	})

})

/*
 * Send message when cliking on "SEND MESSAGE" button
 */
contactForm.sendButton.on(Events.Click, function(event, layer) {

	// Hide "SEND MESSAGE" button
	contactForm.default.visible = false

	contactForm.sending.animate({
		properties: {opacity:1.0},
		time: 0.5
	})

	// Begin sending animation (show loading circle)
	sending = contactForm.sending.animate({
		properties: {rotation:900},
		time: 2
	})

	// When sending is done
	sending.on('end', function(){

		// Hide loading circle
		contactForm.sending.animate({
			properties: {opacity:0},
			time: 0.3
		})

		// Show "MESSAGE SENT"
		sent = contactForm.sent.animate({
			properties: {opacity:1.0},
			time: 0.5
		})
		
		// When sent animation is finished
		sent.on('end', function(){

			// Show contact button
			contactForm.button.visible = true

			// Contact form desappear
			desepear = contactForm.form.animate({
				properties: {y:contactForm.form.y+1000},
				delay: 1,
				time: 0.5,
				curve: "cubic-bezier(0.68, -0.35, 0.265, 1.55)"
			})

			// Reinitialize all values so that we can start again without reloading the page
			desepear.on('end', function(){
				contactForm.form.y = contactForm.form.y-1000
				contactForm.form.scale = 0
				contactForm.name.properties = {opacity:0, y:contactForm.name.y-10}
				contactForm.email.properties = {opacity:0, y:contactForm.email.y-10}
				contactForm.message.properties = {opacity:0, y:contactForm.message.y-10}
				contactForm.sendButton.properties = {opacity:0, y:contactForm.sendButton.y+10}
				contactForm.default.visible = true
				contactForm.sending.properties = {opacity:0, rotation:0}
				contactForm.sent.opacity = 0
			})

		})

	})

})
