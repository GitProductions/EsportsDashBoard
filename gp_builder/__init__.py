import os
import json
import yaml
import logging
from pathlib import Path

class GameConfigBuilder:
    def __init__(self, config_dir="Game Configs/Assets"):
        self.config_dir = config_dir
        self.logger = logging.getLogger(__name__)
        
    def get_supported_extensions(self):
        """Get list of supported config file extensions"""
        return ['.json', '.yaml', '.yml', '.xaml']
    
    def load_config_file(self, file_path):
        """Load configuration from file based on extension"""
        file_ext = Path(file_path).suffix.lower()
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                if file_ext == '.json':
                    return json.load(f)
                elif file_ext in ['.yaml', '.yml']:
                    return yaml.safe_load(f)
                elif file_ext == '.xaml':
                    # For XAML files, we'll treat them as XML/text for now
                    return self._parse_xaml(f.read())
                else:
                    self.logger.error(f"Unsupported file format: {file_ext}")
                    return None
        except Exception as e:
            self.logger.error(f"Failed to load config from {file_path}: {e}")
            return None
    
    def _parse_xaml(self, xaml_content):
        """Basic XAML parsing - extend as needed"""
        # For now, return the raw content
        # You can implement proper XAML parsing here if needed
        return {"raw_xaml": xaml_content}
    
    def scan_game_configs(self):
        """Scan for all supported game configuration files"""
        configs = []
        config_path = os.path.join(os.getcwd(), self.config_dir)
        
        for root, dirs, files in os.walk(config_path):
            for file in files:
                file_path = os.path.join(root, file)
                file_ext = Path(file_path).suffix.lower()
                
                if file_ext in self.get_supported_extensions():
                    configs.append({
                        'path': file_path,
                        'name': Path(file_path).stem,
                        'type': file_ext.lstrip('.'),
                        'game_dir': os.path.basename(root)
                    })
        
        return configs
    
    def process_game_config(self, config_data, config_type='auto'):
        """Process game configuration data into standardized format"""
        if not config_data:
            return None
            
        # Handle YAML format (like Call of Duty.yaml)
        if 'id' in config_data and 'game' in config_data:
            return self._process_yaml_config(config_data)
        
        # Handle existing JSON formats
        return self._process_legacy_config(config_data)
    
    def _process_yaml_config(self, config_data):
        """Process YAML configuration format"""
        processed = {
            'id': config_data.get('id', ''),
            'game': config_data.get('game', ''),
            'version': config_data.get('version', '1.0'),
            'author': config_data.get('author', ''),
            'gamelogo': config_data.get('gamelogo', ''),
            'maps': [],
            'modes': [],
            'roles': [],
            'heroes': []
        }
        
        # Process maps
        for map_data in config_data.get('maps', []):
            processed['maps'].append({
                'name': map_data.get('name', ''),
                'file': map_data.get('file', ''),
                'display_name': map_data.get('name', '')
            })
        
        # Process modes
        for mode_data in config_data.get('modes', []):
            processed['modes'].append({
                'name': mode_data.get('name', ''),
                'file': mode_data.get('file', ''),
                'display_name': mode_data.get('name', '')
            })
        
        # Process roles and heroes
        for role_data in config_data.get('roles', []):
            role = {
                'name': role_data.get('name', ''),
                'file': role_data.get('file', ''),
                'heroes': []
            }
            
            for hero_data in role_data.get('heroes', []):
                hero = {
                    'name': hero_data.get('name', ''),
                    'file': hero_data.get('file', ''),
                    'role': role_data.get('name', ''),
                    'role_file': role_data.get('file', '')
                }
                role['heroes'].append(hero)
                processed['heroes'].append(hero)
            
            processed['roles'].append(role)
        
        return processed
    
    def _process_legacy_config(self, config_data):
        """Process legacy JSON configuration format"""
        # ...existing code...
        # Keep existing JSON processing logic here
        return config_data
    
    def build_game_data(self):
        """Build complete game data from all configuration files"""
        games = {}
        configs = self.scan_game_configs()
        
        for config in configs:
            config_data = self.load_config_file(config['path'])
            processed_data = self.process_game_config(config_data, config['type'])
            
            if processed_data:
                game_id = processed_data.get('id', config['name'])
                games[game_id] = processed_data
                
        return games