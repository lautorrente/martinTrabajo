// GENERAL
let serviceId = document.getElementById('service-id-LE');
let nameLE = document.getElementById('name-LE');
let esamServer = document.getElementById('esamServer-LE');
let urlLE = document.getElementById('url-LE');
let assetsDirectory = document.getElementById('assetsDirectory-LE');

// INPUT
let networkName = document.getElementById('networkName-LE');
let zoneIdentity = document.getElementById('zoneIdentity-LE');
let primaryInterface = document.getElementById('primaryInterface-LE');
let defaultServiceID = document.getElementById('defaultServiceId-LE');

// OUTPUT
let ipAdress = document.getElementById('ipAdress-LE');
let ipPort = document.getElementById('ipPort-LE');

// BUTTONS
let btnSaveExitLE = document.getElementById('btnSaveExitLE');

// LLAMADA A LA API
let llamadaApiLE = btnSaveExitLE.addEventListener('click', () => {
    fetch(`https://cors-anywhere.herokuapp.com/http://152.171.185.241:8080/api/services/config`, {
    'method': 'POST',
    'headers': {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        "Access-Control-Allow-Credentials" : true 
    },
    body: JSON.stringify(
        {
            "service_id": `${serviceId.value}`,
            "service_type": "live_encoding",
            "config_version": "17.13.1",
            "config": {
                "inputs": [
                    {
                        "id": "input_1",
                        "type": "mediaComposer",
                        "streams": [
                            {
                                "id": "Video_01",
                                "type": "video",
                                "sources": [
                                    {
                                        "type": "video",
                                        "pids": [
                                            "auto"
                                        ]
                                    }
                                ],
                                "preprocessing": {
                                    "deblockingFilter": false,
                                    "crosstalkFilter": false,
                                    "spatialDenoisingFilter": "off"
                                }
                            },
                            {
                                "type": "audio",
                                "sources": [
                                    {
                                        "type": "audio",
                                        "pids": [
                                            "auto"
                                        ]
                                    }
                                ],
                                "preprocessing": {
                                    "loudness": {
                                        "method": "alc",
                                        "profile": "custom",
                                        "targetLoudness": -24
                                    }
                                },
                                "id": "Audio_1"
                            },
                            {
                                "type": "metadata.scte35",
                                "automationStream": true,
                                "sources": [
                                    {
                                        "type": "metadata.oob",
                                        "networkName": `${networkName.value}`,
                                        "zoneIdentity": `${zoneIdentity.value}`
                                    }
                                ],
                                "id": "Metadata_1"
                            }
                        ],
                        "live": {
                            "defaultFrameRate": "29.97",
                            "signalLossTimeout": 1000,
                            "sources": [
                                {
                                    "type": "mpeg2tsUdp",
                                    "redundancy": {
                                        "mode": "activePassive"
                                    },
                                    "primaryInterface": `${primaryInterface.value}`
                                }
                            ],
                            "defaultServiceId": `${defaultServiceID.value}`
                        },
                        "barker": {
                            "autoReturnToLive": true,
                            "returnToLiveOnError": true
                        }
                    }
                ],
                "processings": [
                    {
                        "id": "Processings_0",
                        "exportType": "iptv",
                        "streams": [
                            {
                                "id": "Video_01_enc_1",
                                "type": "video",
                                "input": "Video_01",
                                "codec": "h264",
                                "profile": "main",
                                "videoQualityMode": "extreme",
                                "resolution": [
                                    1920,
                                    1080
                                ],
                                "keyFramePeriod": 1000,
                                "gopPolicy": "auto",
                                "dynamicRangeMode": "followInput",
                                "videoDelayMode": "standard",
                                "rateControlMode": "cbr",
                                "frameRate": "regular",
                                "insertClosedCaptions": false,
                                "insertActiveFormatDescription": false,
                                "aspectRatioAdjustment": {
                                    "type": "dynamic",
                                    "top": 0,
                                    "bottom": 0,
                                    "left": 0,
                                    "right": 0
                                },
                                "detailEnhancement": "none",
                                "frameFieldCodingMode": "auto",
                                "videoQualityExperience": "humanVisual",
                                "bitRate": 6000000,
                                "bFrames": "auto",
                                "keyFramePeriodPolicy": "auto"
                            },
                            {
                                "id": "Audio_1_encoded_1",
                                "type": "audio",
                                "input": "Audio_1",
                                "codec": "aac",
                                "bitRate": 96000,
                                "channelMode": "stereo",
                                "samplingRate": 48000
                            },
                            {
                                "id": "Metadata_1_encoded_1",
                                "type": "metadata.scte35",
                                "input": "Metadata_1",
                                "codec": "conditioning"
                            }
                        ]
                    }
                ],
                "name": `${nameLE.value}`,
                "esamServer": {
                    "interface": `${esamServer.value}`
                },
                "automation": {
                    "injector": {
                        "mode": "external",
                        "type": "esam",
                        "url": `${urlLE.value}`,
                        "networkName": `${networkName.value}`,
                        "zoneIdentity": `${zoneIdentity.value}`
                    },
                    "assetsDirectory": `${assetsDirectory.value}`
                },
                "outputs": [
                    {
                        "id": "Output_1",
                        "type": "mpeg2tsUdp",
                        "interface": "ens192",
                        "gopSignaling": "idr",
                        "ttl": 64,
                        "tos": 0,
                        "mpeg2ts": {
                            "standard": "atsc",
                            "pmtPid": 256,
                            "pcrPeriod": 30,
                            "psiPeriod": 100,
                            "programNumber": 1,
                            "alignVideoFramesToPesPackets": true,
                            "insertSpliceCountdown": false,
                            "oneAuPerPesAudioSplices": false,
                            "enableDirectPath": false
                        },
                        "transportStreams": [
                            {
                                "address": `${ipAdress.value}`,
                                "port": `${parseInt(ipPort.value)}`,
                                "streams": [
                                    {
                                        "input": "Video_01_enc_1",
                                        "pid": 121
                                    },
                                    {
                                        "input": "Audio_1_encoded_1",
                                        "pid": 221
                                    },
                                    {
                                        "input": "Metadata_1_encoded_1",
                                        "pid": 321
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "advancedSettings": {
                    "enableOfflineSourceManagement": "true",
                    "mpeg2ts.transportStreamId": "1",
                    "lineup.start.pooling": "600",
                    "lineup.slow.poll": "false",
                    "perChannelLicensing": "true"
                },
                "id": `${serviceId.value}`
            }
        })
    
})
.then(response => response.json())
.then(data => console.log(data));

});


