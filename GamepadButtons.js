ControllerBtnSample = function() {
	var gp, gpDoc, tvDoc, gpctx,
		remoteDisplays = [], proDisplays = [], self = this,
		// images
		gpHLMapImg        = new Image(),
		remoteHLMapImg    = new Image(),
		nunchukHLMapImg   = new Image(),
		classicHLMapImg   = new Image();
		proHLMapImg   = new Image();
	// shortcuts
	var ControllerEvent = nwf.events.ControllerEvent,
		NWFButton = nwf.input.ControllerButton, ButtonControlEvent = nwf.events.ButtonControlEvent;
	
	function init() {
		var displayManager = nwf.display.DisplayManager.getInstance(),
			gpDisplay = displayManager.getGamePadDisplay(),
			tvDisplay = displayManager.getTVDisplay();
		
		gpDoc = gpDisplay.window.document;
		tvDoc = tvDisplay.window.document;
		
		// find and store the string values of the controller type so that a dictionary can be used for button type lookup
		for (var type in nwf.input.ControllerType) {
			bit.sample.controllerTypes[nwf.input.ControllerType[type]] = type;
		}
		
		var img = gpDoc.getElementsByTagName('img')[0];
		var can = gpDoc.getElementsByTagName('canvas')[0];
		can.width = img.width;
		can.height = img.height;
		gpctx = can.getContext('2d');
		
		var i, b, v, container,
			strArr, ctrlType, ctrlBtn;
		
		for (b in nwf.input.ControllerButton) {
			strArr = b.split('_');
			ctrlType = strArr[0];
			ctrlBtn = strArr[strArr.length-1];
			if (ctrlType === 'WII') ctrlType = 'WII_REMOTE';
			if (ctrlType === 'PRO') ctrlType = 'WIIU_PRO';
			if (ctrlBtn === 'STICK') ctrlBtn = strArr[1]+'_'+strArr[2]; // exception: the GamePad and Pro Controllers have L_STICK and R_STICK

			
			v = nwf.input.ControllerButton[b];
			bit.sample.ReverseBtnMap[ctrlType][v] = ctrlBtn;
			console.log(ctrlType+' '+ctrlBtn+' is '+v);
			// console.log('[ControllerBtnSample.init] ReverseBtnMap['+v+']: '+b);
		}
		
		gp = nwf.input.WiiUGamePad.getController();
		
		gp.addEventListener(ControllerEvent.CONTROLLER_CONNECTED, gpAdded, self);
		gp.addEventListener(ControllerEvent.CONTROLLER_DISCONNECTED, gpRemoved, self);
		gp.addEventListener(ControllerEvent.BATTERY_LEVEL_CHANGE, gpBatteryChanged, self);
		
		gp.buttons.addEventListener(ButtonControlEvent.PRESS, onGamePadButtonPress, self);
		gp.buttons.addEventListener(ButtonControlEvent.RELEASE, onGamePadButtonRelease, self);
		
		for (i = 0; i < 4; i++) {
			remoteDisplays.push(new bit.ControllerBtnSample.RemoteDisplay(i, tvDoc));
			remoteDisplays[i].setImages(remoteHLMapImg, nunchukHLMapImg, classicHLMapImg);

			proDisplays.push(new bit.ControllerBtnSample.ProDisplay(i, tvDoc));
			proDisplays[i].setImages(proHLMapImg);
		}
		
		update();
	}
	
	function gpAdded(evt) {
		console.log('[gpAdded] The system error will disappear');
	}
	
	function gpRemoved(evt) {
		console.log('[gpRemoved] A system error will appear');
	}
	
	function gpBatteryChanged(evt) {
		console.log('[gpBatteryChanged] '+evt.target.name+': '+evt.target.batteryLevel+' (max: 4)');
	}
	
	function onGamePadButtonPress(evt) {
		evt.target.controller.startVibrate(bit.sample.VIBRATE_DURATION);
		
		var btnPos = bit.sample.getButtonPosition(evt);
		bit.sample.draw(btnPos, gpHLMapImg, gpctx);
	}
	
	function onGamePadButtonRelease(evt) {
		var btnPos = bit.sample.getButtonPosition(evt);
		bit.sample.clearRect(btnPos, gpctx);
	}