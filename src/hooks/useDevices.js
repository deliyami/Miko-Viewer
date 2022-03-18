const updateDeviceState = useCallback(async () => {
  try {
    const { devices } = await callObject.enumerateDevices();

    const { camera, mic, speaker } = await callObject.getInputDevices();

    const [defaultCam, ...videoDevices] = devices.filter(d => d.kind === 'videoinput' && d.deviceId !== '');
    setCams([defaultCam, ...videoDevices.sort((a, b) => sortByKey(a, b, 'label', false))].filter(Boolean));
    const [defaultMic, ...micDevices] = devices.filter(d => d.kind === 'audioinput' && d.deviceId !== '');
    setMics([defaultMic, ...micDevices.sort((a, b) => sortByKey(a, b, 'label', false))].filter(Boolean));
    const [defaultSpeaker, ...speakerDevices] = devices.filter(d => d.kind === 'audiooutput' && d.deviceId !== '');
    setSpeakers([defaultSpeaker, ...speakerDevices.sort((a, b) => sortByKey(a, b, 'label', false))].filter(Boolean));

    setCurrentDevices({
      camera,
      mic,
      speaker,
    });
  } catch (e) {
    setDeviceState(DEVICE_STATE_NOT_SUPPORTED);
  }
}, [callObject]);
