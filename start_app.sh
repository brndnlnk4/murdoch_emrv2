#!/bin/bash
# WRITTEN BY YA BOI BDIZZY

echo "HEEY!!--------current dir is $(pwd)"

target_dir="/var/www/html/murdoch_emrv2"

$(cd $target_dir)

startDamApp(){
	npm run watch
	return
}

redirectToDamAppDir(){
	if [ -d $target_dir ]
		then
			$target_dir
		else
			echo "__cant find dam directory"
			return 1
	fi

	return
}

if [ $(pwd) == $target_dir ]
	then
		echo "you are in correct dir: $target_dir"
		startDamApp
	#elif [ ... ]
		#then..
	else
		echo " ___WTF!!! you are not in correct dir" && redirectToDamAppDir
fi
