module.exports = {
  root: true,
  extends: ['@tencent/prettier'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: '@tencent/prettier-typescript-react',
      rules: {
        'max-classes-per-file': 'off',
        'space-before-function-paren': 'off',
        /* 兼容规则 */
        'react/jsx-filename-extension': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-param-reassign': 'off',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'],
          },
        ],
        // map遍历可以是用index作为key
        'react/no-array-index-key': 'off',
        // 开放props解构
        'react/destructuring-assignment': 'off',
        // 强制使用 defaultProps
        'react/require-default-props': 'off',
        // a标签必须有content内容
        'jsx-a11y/anchor-has-content': 'off',
        // a标签href不需要验证合法性
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/label-has-associated-control': 'off',
        // 单行最大长度
        'max-len': ['error', { code: 3000 }],
      },
    },
  ],
};
