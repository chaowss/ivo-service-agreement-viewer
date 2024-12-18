import { render, screen } from '@testing-library/react';
import ServiceAgreementViewer, { JsonElement } from './ServiceAgreementViewer';

describe('ServiceAgreementViewer', () => {
  it('syncs mentions with the same ID', () => {
    const testDoc = {
      type: 'block',
      children: [
        {
          type: 'mention',
          id: 'test-date',
          color: 'rgb(20, 170, 245)',
          value: 'January 1, 2024'
        },
        {
          type: 'p',
          children: [
            { text: 'Another reference to the date: ' },
            {
              type: 'mention',
              id: 'test-date',
              color: 'rgb(20, 170, 245)',
              value: 'January 1, 2024'
            }
          ]
        }
      ]
    };

    render(<ServiceAgreementViewer element={testDoc as JsonElement} />);

    // Check that both mentions with the same ID exist
    const mentions = screen.getAllByText('January 1, 2024');
    expect(mentions).toHaveLength(2);
    
    // Check that they have the same ID attribute
    mentions.forEach(mention => {
            expect(mention.closest('.mention')).toHaveAttribute('id', 'test-date');
        });
    });

}); 