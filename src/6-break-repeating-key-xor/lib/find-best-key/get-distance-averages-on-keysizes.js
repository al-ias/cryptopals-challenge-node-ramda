'use strict'

const R = require('ramda')

const updateDistance = ({ averageHammingDistance, timesSeen }, newDistance) => ((averageHammingDistance * timesSeen) + newDistance) / (timesSeen + 1)

const averageDistanceElement = (averagedDistances, { keysize, distance: hammingDistance }) => {
  let avgDistanceObj = null

  if (!R.has(keysize, averagedDistances)) {
    avgDistanceObj = { averageHammingDistance: hammingDistance, timesSeen: 1 }
  } else {
    const oldAvgDistance = averagedDistances[keysize]
    avgDistanceObj = {
      averageHammingDistance: updateDistance(oldAvgDistance, hammingDistance),
      timesSeen: R.inc(oldAvgDistance.timesSeen)
    }
  }
  return avgDistanceObj
}

const getAvgKeysizes = (averegedDistances, keysizeDistanceArray) => {
  let localAveragedDistances = averegedDistances

  for (const { keysize, distance } of keysizeDistanceArray) {
    const avgDistanceObj = averageDistanceElement(localAveragedDistances, { keysize, distance })

    localAveragedDistances = R.assoc(keysize, avgDistanceObj, localAveragedDistances)
  }

  return localAveragedDistances
}

const getDistanceAveragesOnKeysizes = R.reduce(getAvgKeysizes, {})

const toKeysizeAndDistanceFormat = R.map(R.prop('averageHammingDistance'))

const getMinimumValue = R.pipe(
  R.values,
  R.reduce(R.min, Number.MAX_VALUE, R.__)
)

const propThatEquals = (propValue, obj) => R.find(
  R.propEq(R.__, propValue, obj),
  R.keys(obj)
)

const selectMinimumDistanceKeysize = R.converge(
  propThatEquals,
  [getMinimumValue, R.identity]
)

const selectBestKeysize = R.pipe(
  toKeysizeAndDistanceFormat,
  selectMinimumDistanceKeysize,
  (keysizeString) => parseInt(keysizeString)
)

module.exports = { getDistanceAveragesOnKeysizes, selectBestKeysize }
