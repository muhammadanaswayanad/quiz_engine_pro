from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
import logging

_logger = logging.getLogger(__name__)

class MatrixRow(models.Model):
    _name = 'quiz.matrix.row'
    _description = 'Matrix Question Row'
    _order = 'sequence, id'
    
    sequence = fields.Integer(string='Sequence', default=10)
    question_id = fields.Many2one('quiz.question', string='Question', required=True, ondelete='cascade')
    name = fields.Char(string='Row Label', required=True)
    description = fields.Text(string='Description', help='Optional description or context for this row')

class MatrixColumn(models.Model):
    _name = 'quiz.matrix.column'
    _description = 'Matrix Question Column'
    _order = 'sequence, id'
    
    sequence = fields.Integer(string='Sequence', default=10)
    question_id = fields.Many2one('quiz.question', string='Question', required=True, ondelete='cascade')
    name = fields.Char(string='Column Label', required=True)
    description = fields.Text(string='Description', help='Optional description or context for this column')

class MatrixCell(models.Model):
    _name = 'quiz.matrix.cell'
    _description = 'Matrix Question Cell'
    
    question_id = fields.Many2one('quiz.question', string='Question', related='row_id.question_id', store=True)
    row_id = fields.Many2one('quiz.matrix.row', string='Row', required=True, ondelete='cascade')
    column_id = fields.Many2one('quiz.matrix.column', string='Column', required=True, ondelete='cascade')
    is_correct = fields.Boolean(string='Is Correct', default=False,
                               help='Mark as correct if this cell should be selected for the correct answer')
    
    _sql_constraints = [
        ('unique_row_col_per_question', 
         'UNIQUE(row_id, column_id)',
         'Each cell in the matrix must be unique')
    ]
