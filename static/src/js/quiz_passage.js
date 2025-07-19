/* JavaScript for Reading Passage Questions */
odoo.define('quiz_engine_pro.passage_question', function (require) {
    'use strict';

    var publicWidget = require('web.public.widget');

    publicWidget.registry.PassageQuestion = publicWidget.Widget.extend({
        selector: '.passage-question',
        events: {
            'click .passage-tab': '_onTabClick',
            'click .next-question-btn': '_onNextSubQuestion',
            'click .prev-question-btn': '_onPrevSubQuestion',
            'change input[type="radio"]': '_updateAnswerState',
            'change input[type="checkbox"]': '_updateAnswerState',
            'input textarea': '_updateAnswerState',
            'submit #passage-question-form': '_onFormSubmit'
        },

        /**
         * @override
         */
        start: function () {
            var def = this._super.apply(this, arguments);
            this._initPassageQuestion();
            return def;
        },

        /**
         * Initialize the passage question interface
         * @private
         */
        _initPassageQuestion: function () {
            // Show the first sub-question
            this.$('.sub-question').hide();
            this.$('.sub-question:first').show();
            
            // Mark the first tab as active
            this.$('.passage-tab:first').addClass('active');
            
            // Initialize the answers object
            this.answers = {};
            
            // Update navigation buttons
            this._updateNavigationButtons();
            
            // Set up persistent passage view on desktop
            if (window.innerWidth >= 992) {
                this._setupStickyPassage();
            }
        },

        /**
         * Set up sticky passage on desktop
         * @private
         */
        _setupStickyPassage: function () {
            const passageContent = this.$('.passage-content')[0];
            if (!passageContent) return;
            
            const observer = new IntersectionObserver(
                ([e]) => {
                    e.target.classList.toggle('is-sticky', e.intersectionRatio < 1);
                },
                { threshold: [1] }
            );
            
            observer.observe(passageContent);
        },

        /**
         * Handle tab clicks to switch between sub-questions
         * @private
         * @param {Event} ev
         */
        _onTabClick: function (ev) {
            ev.preventDefault();
            var $tab = $(ev.currentTarget);
            var questionIndex = $tab.data('question-index');
            
            // Save current answers
            this._saveCurrentAnswers();
            
            // Update active tab
            this.$('.passage-tab').removeClass('active');
            $tab.addClass('active');
            
            // Show the selected question
            this.$('.sub-question').hide();
            this.$('.sub-question[data-index="' + questionIndex + '"]').show();
            
            // Update navigation buttons
            this._updateNavigationButtons();
        },

        /**
         * Handle next question button clicks
         * @private
         * @param {Event} ev
         */
        _onNextSubQuestion: function (ev) {
            ev.preventDefault();
            var currentIndex = parseInt(this.$('.passage-tab.active').data('question-index'));
            var nextIndex = currentIndex + 1;
            
            // Save current answers
            this._saveCurrentAnswers();
            
            // Activate next tab if it exists
            var $nextTab = this.$('.passage-tab[data-question-index="' + nextIndex + '"]');
            if ($nextTab.length) {
                this.$('.passage-tab').removeClass('active');
                $nextTab.addClass('active');
                
                // Show the next question
                this.$('.sub-question').hide();
                this.$('.sub-question[data-index="' + nextIndex + '"]').show();
            }
            
            // Update navigation buttons
            this._updateNavigationButtons();
        },

        /**
         * Handle previous question button clicks
         * @private
         * @param {Event} ev
         */
        _onPrevSubQuestion: function (ev) {
            ev.preventDefault();
            var currentIndex = parseInt(this.$('.passage-tab.active').data('question-index'));
            var prevIndex = currentIndex - 1;
            
            // Save current answers
            this._saveCurrentAnswers();
            
            // Activate previous tab if it exists
            var $prevTab = this.$('.passage-tab[data-question-index="' + prevIndex + '"]');
            if ($prevTab.length) {
                this.$('.passage-tab').removeClass('active');
                $prevTab.addClass('active');
                
                // Show the previous question
                this.$('.sub-question').hide();
                this.$('.sub-question[data-index="' + prevIndex + '"]').show();
            }
            
            // Update navigation buttons
            this._updateNavigationButtons();
        },

        /**
         * Update navigation buttons based on current question
         * @private
         */
        _updateNavigationButtons: function () {
            var currentIndex = parseInt(this.$('.passage-tab.active').data('question-index'));
            var totalQuestions = this.$('.passage-tab').length;
            
            // Update previous button
            var $prevBtn = this.$('.prev-question-btn');
            if (currentIndex === 0) {
                $prevBtn.prop('disabled', true).addClass('disabled');
            } else {
                $prevBtn.prop('disabled', false).removeClass('disabled');
            }
            
            // Update next button
            var $nextBtn = this.$('.next-question-btn');
            if (currentIndex === totalQuestions - 1) {
                $nextBtn.prop('disabled', true).addClass('disabled');
            } else {
                $nextBtn.prop('disabled', false).removeClass('disabled');
            }
        },

        /**
         * Save answers for the current sub-question
         * @private
         */
        _saveCurrentAnswers: function () {
            var self = this;
            var $currentQuestion = this.$('.sub-question:visible');
            var questionId = $currentQuestion.data('question-id');
            var questionType = $currentQuestion.data('question-type');
            
            if (questionType === 'mcq_single') {
                var $selected = $currentQuestion.find('input[type="radio"]:checked');
                if ($selected.length) {
                    self.answers[questionId] = $selected.val();
                }
            } else if (questionType === 'mcq_multiple') {
                var selectedValues = [];
                $currentQuestion.find('input[type="checkbox"]:checked').each(function () {
                    selectedValues.push($(this).val());
                });
                self.answers[questionId] = selectedValues;
            } else if (questionType === 'text_short' || questionType === 'text_long') {
                var text = $currentQuestion.find('textarea').val();
                if (text) {
                    self.answers[questionId] = text;
                }
            }
            
            // Update hidden input with all answers
            this._updateHiddenAnswersField();
        },

        /**
         * Update the hidden form field with all answers
         * @private
         */
        _updateHiddenAnswersField: function () {
            var $hiddenField = this.$('input[name="answer_data"]');
            $hiddenField.val(JSON.stringify(this.answers));
        },

        /**
         * Update answer state when user selects an answer
         * @private
         */
        _updateAnswerState: function () {
            this._saveCurrentAnswers();
        },

        /**
         * Handle form submission
         * @private
         * @param {Event} ev
         */
        _onFormSubmit: function (ev) {
            // Make sure we save all answers before submission
            this._saveCurrentAnswers();
        }
    });

    return publicWidget.registry.PassageQuestion;
});
