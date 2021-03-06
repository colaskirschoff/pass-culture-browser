import sortAlphabeticallyArrayOfObjectsByProperty, {
  removeDuplicatesObjects,
} from '../arrayOfObjects'

describe('src | utils | arrayOfObjects | sortAlphabeticallyArrayOfObjectsByProperty', () => {
  it('should return the array sorted by property', () => {
    // given
    const typesArray = [
      {
        description: 'Fake description',
        sublabel: 'One Label',
      },
      {
        description: 'Fake description',
        sublabel: 'One Label',
      },
      {
        description: 'Another Fake description',
        sublabel: 'Another Label',
      },
      {
        description: 'Another Fake description',
        sublabel: 'Another Label',
      },
      {
        description: 'Another Fake description',
        sublabel: 'Another Label',
      },
    ]

    // when
    const result = removeDuplicatesObjects(typesArray)
    const expected = [
      {
        description: 'Fake description',
        sublabel: 'One Label',
      },
      {
        description: 'Another Fake description',
        sublabel: 'Another Label',
      },
    ]
    // then
    expect(result).toEqual(expected)
  })
})

describe('src | utils | arrayOfObjects | sortAlphabeticallyArrayOfObjectsByProperty', () => {
  it('should return the array sorted by property', () => {
    // given
    const typesArray = [
      {
        description:
          'Résoudre l’énigme d’un jeu de piste dans votre ville ? Jouer en ligne entre amis ? Découvrir cet univers étrange avec une manette ?',
        sublabel: 'Jouer',
      },
      {
        description:
          'Plutôt rock, rap ou classique ? Sur un smartphone avec des écouteurs ou entre amis au concert ?',
        sublabel: 'Écouter',
      },
      {
        description:
          'Suivre un géant de 12 mètres dans la ville ? Rire aux éclats devant un stand up ? Rêver le temps d’un opéra ou d’un spectacle de danse ? Assister à une pièce de théâtre, ou se laisser conter une histoire ?',
        sublabel: 'Applaudir',
      },
      {
        description:
          'S’abonner à un quotidien d’actualité ? À un hebdomadaire humoristique ? À un mensuel dédié à la nature ? Acheter une BD ou un manga ? Ou tout simplement ce livre dont tout le monde parle ?',
        sublabel: 'Lire',
      },
    ]
    // when
    const result = typesArray.sort(
      sortAlphabeticallyArrayOfObjectsByProperty('sublabel')
    )
    const expected = [
      {
        description:
          'Suivre un géant de 12 mètres dans la ville ? Rire aux éclats devant un stand up ? Rêver le temps d’un opéra ou d’un spectacle de danse ? Assister à une pièce de théâtre, ou se laisser conter une histoire ?',
        sublabel: 'Applaudir',
      },
      {
        description:
          'Plutôt rock, rap ou classique ? Sur un smartphone avec des écouteurs ou entre amis au concert ?',
        sublabel: 'Écouter',
      },
      {
        description:
          'Résoudre l’énigme d’un jeu de piste dans votre ville ? Jouer en ligne entre amis ? Découvrir cet univers étrange avec une manette ?',
        sublabel: 'Jouer',
      },
      {
        description:
          'S’abonner à un quotidien d’actualité ? À un hebdomadaire humoristique ? À un mensuel dédié à la nature ? Acheter une BD ou un manga ? Ou tout simplement ce livre dont tout le monde parle ?',
        sublabel: 'Lire',
      },
    ]

    // then
    expect(result).toEqual(expected)
  })

  //   it.skip("should return the array sorted by property even if it contains special chars", () => {
  //     // given
  //     const typesArray = [
  //       {
  //         "description": "Fake description",
  //         "sublabel": "\u00c9couter"
  //       },
  //       {
  //         "description": "Another Fake description",
  //         "sublabel": "Pratiquer"
  //       }
  //     ]
  //     const expected = [
  //       {
  //         "description": "Another Fake description",
  //         "sublabel": "Pratiquer"
  //       },
  //       {
  //         "description": "Fake description",
  //         "sublabel": "\u00c9couter"
  //       }
  //     ]
  //
  //     // when
  //     const result = typesArray.sort(arrayOfObjects('sublabel'))
  //
  //     // then
  //     expect(result).toEqual(expected)
  //   })
  // })

  it.skip("should return typesArray if property passed doesn't match any object key", () => {
    // given
    const typesArray = [
      {
        description: 'Fake description',
        sublabel: 'Bo',
      },
      {
        description: 'Another Fake description',
        sublabel: 'Ar',
      },
    ]

    // when
    const result = typesArray.sort(
      sortAlphabeticallyArrayOfObjectsByProperty('fake')
    )

    // then
    expect(result).toEqual(typesArray)
  })
})
