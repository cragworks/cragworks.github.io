/*----------------------------------------------------------------------------*
    Copyright 2012-2014 Nintendo.  All rights reserved.
    
    These coded instructions, statements, and computer programs contain 
    proprietary information of Nintendo of America Inc. and/or Nintendo 
    Company Ltd., and are protected by Federal copyright law.  They may 
    not be disclosed to third parties or copied or duplicated in any form,
    in whole or in part, without the prior written consent of Nintendo. 
 *----------------------------------------------------------------------------*/

/**
 * Utility class for loading sound buffers to be used by the Web Audio API
 *
 * See: http://www.html5rocks.com/en/tutorials/webaudio/intro/
 *
 * @param {type} audioContext  
 * @param {type} urlList  
 * @param {type} callback
 *
 * bit Interactive Team
 * @author Ryan Lynd
 * (c) Nintendo
 */
WebAudioManager = function WebAudioManager(audioContext, urlList, callback) {
    this.context = audioContext;
    this.tvCTX = audioContext;
    this.gpCTX = [audioContext];
    this.tvDevice = null;
    this.gpDevice = null; // {}/[]
    this.urlList = urlList;
    this.onload = callback;
    this.bufferList = new Array();
    this.loadCount = 0;
}

WebAudioManager.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          console.log('[WebAudioManager] error decoding file data: ' + url);
          return loader;
        }
        loader.bufferList[index] = buffer;
        //console.log('[WebAudioManager] buffer loaded:', buffer);
        if (++loader.loadCount == loader.urlList.length){
          loader.onload(loader.bufferList);
        }
      }
    );
  }

  request.onerror = function() {
    console.log('[WebAudioManager] XHR error');
  }

  request.send();

  return loader;
}

WebAudioManager.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i){
      this.loadBuffer(this.urlList[i], i);
      console.log('[WebAudioManager] sound loaded: ' + this.urlList[i]);
    }
    return this;
}


/**
 * 
 * @param {type} audioNode 
 */
WebAudioManager.prototype.setTVAudioDevice = function( audioDevice ){
    this.tvDevice = audioDevice;
}
/**
 * 
 * @param {WebAudioNode|WebAudioNode[]} audioNode 
 */
WebAudioManager.prototype.setGamePadAudioDevice = function( audioDevice ){
  if(audioDevice.length){
      this.gpDevice = audioDevice
  } else {
      this.gpDevice = [audioDevice];
  }
}

//------------------------------------------------------------------------------
WebAudioManager.prototype.stop = function(){
    // play sound
    musicSource.noteOff(0);
    return this;
}

WebAudioManager.prototype.stopFlipSound = function(){
    // play sound
    flipSoundSource.noteOff(0);
    return this;
}

/**
 * Plays a sound buffer.
 * 
 * @param {type} buffer 
 * @param {type} audioContext 
 * @param {type} time 
 * @param {type} timeOff 
 * @param {type} loop 
 * @param {type} audioNodes
 */

var musicSource;
var flipSoundSource;
WebAudioManager.prototype.playSound = function(buffer, audioContext, time, timeOff, loop, audioNodes) {
    var device;
    if( !audioContext ){
        device = this.context.destination;
    } else if ( audioContext === 'tv' && this.tvDevice ){
        device = this.tvDevice;
    } else if ( audioContext === 'gamepad' && this.gpDevice ){
        device = this.gpDevice[0];
    } else {
        device = this.context.destination;
    }
    time = time ? time : this.context.currentTime;
    var source = this.context.createBufferSource();
    source.buffer = buffer;
    source.loop = loop ? true : false;
    // set-up routing graph 
    if(audioNodes){
        var i, len = audioNodes.length, prevNode = source, node;
        for (i = 0; i < len; i++) {
            node = audioNodes[i];
            prevNode.connect(node);
            prevNode = node;
        };
        prevNode.connect(device);
    } else {
        // direct connection
        source.connect(device);
    }

    // play sound
    source.noteOn(time);
    if(timeOff) source.noteOff(timeOff);

    //save source if music
    if(loop==true){
      if(musicSource!=null)
        musicSource.noteOff(0);
      musicSource = source;
    } 
    else if(time==0.01)
    {
      if(flipSoundSource!=null)
        flipSoundSource.noteOff(0);
      flipSoundSource = source;
    }
    return this;
}

