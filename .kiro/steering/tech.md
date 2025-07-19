# Technical Stack & Build System

## Framework & Platform
- **Odoo 17 Community Edition** - Primary application framework
- **Python 3.8+** - Backend programming language
- **PostgreSQL** - Database system (Odoo standard)
- **JavaScript ES6+** - Frontend interactivity
- **QWeb Templates** - Odoo's templating engine
- **CSS3** - Styling with responsive design

## Dependencies
### Core Odoo Modules
- `base` - Core Odoo functionality
- `web` - Web interface components
- `website` - Public website features

### External Dependencies
- No external Python packages required
- Uses Odoo's built-in libraries and frameworks

## Architecture Patterns
### MVC Pattern
- **Models**: Database layer with ORM (`models/`)
- **Views**: XML templates and forms (`views/`)
- **Controllers**: HTTP request handlers (`controllers/`)

### Key Design Patterns
- **Token-based Sessions**: UUID tokens for public access without authentication
- **JSON Data Storage**: Flexible answer data in text fields
- **Computed Fields**: Dynamic calculations with search methods
- **One2many Relationships**: Hierarchical data structure (quiz → questions → choices)

## Development Commands

### Module Installation
```bash
# Restart Odoo server
sudo systemctl restart odoo

# Install via UI: Apps → Search "Quiz" → Install
# Or via command line:
odoo-bin -i quiz_engine_pro -d database_name
```

### Development Workflow
```bash
# Update module after changes
odoo-bin -u quiz_engine_pro -d database_name

# Enable developer mode for debugging
# Settings → Activate Developer Mode

# View logs
tail -f /var/log/odoo/odoo.log
```

### Testing Commands
```bash
# Access public quiz URLs
curl http://localhost:8069/quiz

# Test specific quiz
curl http://localhost:8069/quiz/test-slug

# Check module status
# Apps → Installed → Search "Quiz"
```

## Code Quality Standards
- **PEP 8** compliance for Python code
- **Odoo 17** syntax (no deprecated `attrs` attributes)
- **CSRF disabled** for public routes (`csrf=False`)
- **Proper field constraints** and validation
- **Comprehensive error handling** with logging

## Performance Considerations
- **Database indexing** on frequently queried fields
- **Computed field caching** with proper dependencies
- **Efficient ORM queries** using `search()` and `mapped()`
- **Static asset optimization** through Odoo's asset bundling
- **Session cleanup** for expired tokens