function isValidStringField(value, minLength = 3, maxLength = 50) {
  return (
    typeof value === "string" &&
    value.trim().length >= minLength &&
    value.trim().length <= maxLength
  );
}

function isValidLaunch(launch) {
  return (
    isValidStringField(launch.mission) &&
    isValidStringField(launch.rocket) &&
    isValidStringField(launch.target) &&
    typeof launch.launchDate === "string" &&
    !isNaN(new Date(launch.launchDate).valueOf())
  );
}

module.exports = { isValidLaunch };
