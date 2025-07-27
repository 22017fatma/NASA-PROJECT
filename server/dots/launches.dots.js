


function isValidLaunch(launch) {
    return (
    typeof launch.mission === 'string' &&
    typeof launch.rocket === 'string' &&
    typeof launch.target === 'string' &&
    typeof launch.launchDate === 'string' &&
    !isNaN(new Date(launch.launchDate))
    );
}


export{isValidLaunch};