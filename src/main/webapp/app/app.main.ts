import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from './blocks/config/prod.config';
import { BlogAppModule } from './app.module';

ProdConfig();

platformBrowserDynamic().bootstrapModule(BlogAppModule);
