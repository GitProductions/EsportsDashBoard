set -e
SOURCE_DIR="Game Configs/Assets"

echo "Starting script. SOURCE_DIR: $SOURCE_DIR"

for folder in "$SOURCE_DIR"/*; do
  if [ -d "$folder" ]; then
    for subfolder in "$folder"/*; do
      if [ -d "$subfolder" ]; then

        echo "Processing subfolder: $subfolder"

        # Check for the xaml file in the subfolder, not found then skip
        xaml_file=$(find "$subfolder" -maxdepth 1 -type f -name "*.xaml" | head -n 1)
        if [ -z "$xaml_file" ]; then
          echo "Skipping folder '$subfolder': No xaml file found."
          continue
        fi

        # Extracting metadata from the xaml file
        game=$(grep -oP '(?<=<game>).*?(?=</game>)' "$xaml_file" | xargs)
        version=$(grep -oP '(?<=<version>).*?(?=</version>)' "$xaml_file" | xargs)
        author=$(grep -oP '(?<=<author>).*?(?=</author>)' "$xaml_file" | xargs)

        # Validate metadata
        if [ -z "$game" ] || [ -z "$version" ] || [ -z "$author" ]; then
          echo "Skipping folder '$subfolder': xaml file is missing required fields."
          continue
        fi

        echo "Processing '$subfolder': Game: $game, Version: $version, Author: $author"

        base_dir="$(pwd)"
        target_dir="$base_dir/Game Configs/$game"
        
        mkdir -p "$target_dir"

        echo "Target directory: $target_dir"

        # Full path for zip file
        zip_file="$target_dir/$game-$author-$version.zip"
        bgg_file="$target_dir/$game-$author-$version.bgg"

        # Change to subfolder directory
        cd "$subfolder" || exit

        # Create zip, using relative paths
        zip -r "$zip_file" .
        
        # Rename zip to .bgg
        mv "$zip_file" "$bgg_file"

        cd "$base_dir"
      fi
    done
  fi
done

echo "All valid folders have been processed."
